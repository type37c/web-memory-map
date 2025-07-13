# Supabase Setup Guide

## Database Schema

Run these SQL commands in the Supabase SQL Editor:

```sql
-- Create tables
create table maps (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  name text not null,
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

create table nodes (
  id uuid default gen_random_uuid() primary key,
  map_id uuid references maps(id) on delete cascade,
  url text not null,
  title text not null,
  x float not null,
  y float not null,
  favicon text,
  note text,
  tags text[],
  added_at timestamp with time zone default timezone('utc'::text, now())
);

create table edges (
  id uuid default gen_random_uuid() primary key,
  map_id uuid references maps(id) on delete cascade,
  source_id uuid references nodes(id) on delete cascade,
  target_id uuid references nodes(id) on delete cascade,
  note text
);

-- Enable Row Level Security
alter table maps enable row level security;
alter table nodes enable row level security;
alter table edges enable row level security;

-- Create policies
create policy "Public maps are viewable by everyone" on maps
  for select using (is_public = true);

create policy "Users can manage own maps" on maps
  for all using (auth.uid() = user_id);

create policy "Anonymous users can create maps" on maps
  for insert with check (true);

create policy "Nodes are viewable if map is viewable" on nodes
  for select using (
    exists (
      select 1 from maps 
      where maps.id = nodes.map_id 
      and (maps.is_public = true or maps.user_id = auth.uid())
    )
  );

create policy "Anyone can add nodes to maps" on nodes
  for insert with check (true);

create policy "Anyone can update nodes" on nodes
  for update using (true);

create policy "Edges follow same rules as nodes" on edges
  for select using (
    exists (
      select 1 from maps 
      where maps.id = edges.map_id 
      and (maps.is_public = true or maps.user_id = auth.uid())
    )
  );

create policy "Anyone can manage edges" on edges
  for all using (true);
```

## Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Testing

1. Create a new map via the API
2. Add nodes to the map
3. Verify data appears in Supabase dashboard
4. Test public/private visibility