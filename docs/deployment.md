# Deployment Guide

## Vercel Deployment

### Prerequisites
- GitHub repository
- Vercel account
- Supabase project

### Steps

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the root directory

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build --workspace=apps/web`
   - Install Command: `npm install`

3. **Environment Variables**
   Add these in Vercel project settings:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `your-project.vercel.app`

## Chrome Extension

### Publishing to Chrome Web Store

1. **Build for production**
   ```bash
   npm run extension:build
   ```

2. **Create ZIP file**
   ```bash
   cd apps/extension/dist
   zip -r ../web-memory-map-extension.zip .
   ```

3. **Upload to Chrome Web Store**
   - Go to [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Create new item
   - Upload ZIP file
   - Fill in listing details
   - Submit for review

### Local Testing
1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `apps/extension/dist` folder

## GitHub Actions

The CI workflow automatically:
- Builds both web app and extension
- Runs type checking
- Runs linting
- Triggers on push to main and PRs

## Custom Domain

To add a custom domain in Vercel:
1. Go to project settings → Domains
2. Add your domain
3. Configure DNS as instructed
4. SSL is automatic