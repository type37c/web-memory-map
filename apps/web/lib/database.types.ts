export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      maps: {
        Row: {
          id: string
          user_id: string | null
          name: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      nodes: {
        Row: {
          id: string
          map_id: string
          url: string
          title: string
          x: number
          y: number
          favicon: string | null
          note: string | null
          tags: string[] | null
          added_at: string
        }
        Insert: {
          id?: string
          map_id: string
          url: string
          title: string
          x: number
          y: number
          favicon?: string | null
          note?: string | null
          tags?: string[] | null
          added_at?: string
        }
        Update: {
          id?: string
          map_id?: string
          url?: string
          title?: string
          x?: number
          y?: number
          favicon?: string | null
          note?: string | null
          tags?: string[] | null
          added_at?: string
        }
      }
      edges: {
        Row: {
          id: string
          map_id: string
          source_id: string
          target_id: string
          note: string | null
        }
        Insert: {
          id?: string
          map_id: string
          source_id: string
          target_id: string
          note?: string | null
        }
        Update: {
          id?: string
          map_id?: string
          source_id?: string
          target_id?: string
          note?: string | null
        }
      }
    }
  }
}