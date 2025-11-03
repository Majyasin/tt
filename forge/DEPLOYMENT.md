# Quick Deployment Guide

## Deploy to Vercel (Easiest - 2 minutes)

1. **Push your code to GitHub** (already done)

2. **Go to [vercel.com](https://vercel.com)**

3. **Import your repository**:
   - Click "New Project"
   - Import from GitHub: `Majyasin/tt`
   - Select the `claude/build-lovable-bolt-alternative-011CUk1Q3By3rKePfGc5hZUY` branch

4. **Configure build settings**:
   - Framework Preset: `Vite`
   - Root Directory: `forge`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Deploy!** - Your app will be live at `https://your-project.vercel.app`

---

## Deploy to Netlify (Alternative)

1. **Go to [netlify.com](https://netlify.com)**

2. **New site from Git**:
   - Connect to GitHub
   - Select repository: `Majyasin/tt`
   - Select branch: `claude/build-lovable-bolt-alternative-011CUk1Q3By3rKePfGc5hZUY`

3. **Build settings**:
   - Base directory: `forge`
   - Build command: `npm run build`
   - Publish directory: `forge/dist`

4. **Deploy!** - Live at `https://your-site.netlify.app`

---

## Deploy to GitHub Pages

```bash
# In your local terminal (if you have the repo locally):
cd forge
npm install
npm run build

# Install gh-pages
npm install -g gh-pages

# Deploy
gh-pages -d dist -b gh-pages
```

Your site will be at: `https://majyasin.github.io/tt/`

---

## What You Built - FORGE Platform

Your platform includes:

### Beautiful UI (Charcoal & White)
- Clean header with project controls
- Collapsible file explorer sidebar
- Split-screen editor and preview
- AI chat panel on the right
- Integrated terminal (toggle with button)

### Code Editor
- Monaco editor (same as VS Code)
- Syntax highlighting for 20+ languages
- Tab management for multiple files
- Auto-save functionality
- Line numbers, minimap, IntelliSense ready

### Live Preview
- Real-time rendering
- Device switcher (mobile/tablet/desktop)
- Responsive viewport testing
- Refresh button
- Open in new tab option

### AI Assistant
- Chat interface for natural language prompts
- Automatic code generation
- File creation from AI responses
- Message history
- Clear chat function

### File System
- Tree view with folders/files
- Expand/collapse folders
- Click to open files
- Visual file type icons
- Sample project included

### Terminal
- Command execution
- Output display
- Command history
- Clear terminal
- Toggle visibility

---

## Preview Images

Since you can't see localhost, here's what each section looks like:

### Header (Top bar)
```
┌─────────────────────────────────────────────────────────────┐
│ [Code2] FORGE    My Project    [Run] [Export] [Deploy]     │
└─────────────────────────────────────────────────────────────┘
```

### Main Layout
```
┌──────────┬─────────────────────┬────────────────┬──────────┐
│ [Folder] │   </> Code Editor   │   [Monitor]    │ [Sparkle]│
│  Files   │   ┌──────────────┐  │   Preview      │   AI     │
│          │   │ App.tsx   ×  │  │                │   Chat   │
│  ├─ src  │   └──────────────┘  │  [Phone][Tab]  │          │
│  │ ├─App │   import React...   │  [Desktop]     │  [Send]  │
│  │ └─idx │   function App()    │   Content      │          │
│  └─pkg   │   {...code...}      │   Here         │  Clear   │
└──────────┴─────────────────────┴────────────────┴──────────┘
```

### **Color Scheme**
- Background: `#1a1a1a` (Charcoal 900)
- Secondary: `#2d2d2d` (Charcoal 800)
- Borders: `#404040` (Charcoal 700)
- Text: `#ffffff` (White)
- Buttons: White on dark, dark on white
- NO gradients anywhere!

---

## Recommended: Deploy to Vercel NOW

It's the fastest way to see your work live:

1. Go to https://vercel.com/new
2. Sign in with GitHub
3. Import `Majyasin/tt`
4. Set root to `forge`
5. Click Deploy

**You'll have a live URL in under 2 minutes!**

---

## Local Testing (If you have Node.js)

If you clone the repo locally:

```bash
git clone <your-repo-url>
cd tt/forge
npm install
npm run dev
```

Then open http://localhost:5173
