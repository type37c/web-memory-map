# Web Memory Map

> 🌐 An open-source platform for spatially mapping and sharing web discoveries

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## Vision

Web Memory Map transforms how we save, explore, and share online discoveries. Instead of bookmarks lost in folders, create living maps of your web journey - positioning sites in 2D space based on their relationships and meaning to you.

**Core Values:**
- 🆓 **Open Source First**: Fully transparent from day one
- 🧠 **Spatial Thinking**: Information organized in 2D space, not lists
- 🌱 **Community Owned**: Your knowledge stays yours
- ⚡ **Radically Simple**: Complexity is the enemy

## Features (MVP)

- 🔗 Place URLs on a 2D canvas
- ✋ Drag to organize spatially  
- 📝 Add brief notes to connections
- 👁️ Share maps publicly or keep private
- 🧭 Explore others' knowledge maps

## Quick Start

```bash
# Clone the repository
git clone https://github.com/type37c/web-memory-map.git
cd web-memory-map

# Install dependencies
npm install

# Start development
npm run dev          # Web app at http://localhost:3000
npm run extension:dev # Build Chrome extension
```

## Project Structure

```
web-memory-map/
├── apps/
│   ├── web/          # Next.js web application
│   └── extension/    # Chrome extension (Vanilla JS)
├── packages/
│   └── shared/       # Shared utilities
├── docs/             # Documentation
└── examples/         # Example maps
```

## Tech Stack

- **Web App**: Next.js 14, TypeScript, Tailwind CSS, D3.js
- **Extension**: Vanilla JavaScript, Manifest V3
- **Backend**: Supabase (Auth, Database, Realtime)
- **Hosting**: Vercel

## Roadmap

### Phase 1: Local-First (Week 1)
- [x] Project setup
- [ ] Basic D3.js map component
- [ ] Add/move/delete nodes
- [ ] Local storage persistence
- [ ] Chrome extension MVP

### Phase 2: Sharing (Week 2) 
- [ ] Supabase integration
- [ ] Anonymous usage (login optional)
- [ ] Public map URLs
- [ ] Simple profiles

### Phase 3: Launch (Week 3)
- [ ] Polish UI/UX
- [ ] Demo maps
- [ ] Documentation
- [ ] Launch on HN/Twitter

## Contributing

We believe great software is built by communities. Whether you're fixing a typo or proposing new features, your contribution matters.

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Philosophy

This project rejects the complexity trap. We're building a tool that:
- Does one thing exceptionally well
- Respects user agency and data ownership  
- Stays fast and lightweight forever
- Values community over metrics

## License

MIT - see [LICENSE](LICENSE)

---

<p align="center">
  Made with ❤️ by the open web community
</p>