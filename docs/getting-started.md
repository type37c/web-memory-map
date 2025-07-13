# Getting Started

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/type37c/web-memory-map.git
   cd web-memory-map
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development servers**
   ```bash
   # Web app (http://localhost:3000)
   npm run dev
   
   # Chrome extension (in another terminal)
   npm run extension:dev
   ```

## Installing the Chrome Extension

1. Build the extension:
   ```bash
   npm run extension:build
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (top right)

4. Click "Load unpacked"

5. Select the `apps/extension/dist` folder

6. The extension icon should appear in your toolbar!

## Using Web Memory Map

### Collecting Sites
1. Browse to any website
2. Click the Web Memory Map extension icon
3. Add tags and notes (optional)
4. Click "Add to Map"

### Organizing Your Map
1. Visit http://localhost:3000
2. Drag nodes to arrange them spatially
3. Click nodes to view details
4. Connect related sites by drawing edges

## Project Structure

- `apps/web/` - Next.js web application
- `apps/extension/` - Chrome extension  
- `packages/shared/` - Shared utilities (future)
- `docs/` - Documentation
- `examples/` - Example maps and demos

## Next Steps

- Check out [CONTRIBUTING.md](../CONTRIBUTING.md) to start contributing
- Join our community discussions on GitHub
- Share your maps and get feedback!