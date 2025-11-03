# FORGE

> A premium AI-powered development platform - Build full-stack applications through natural language

**Forge** is a Lovable/Bolt.new alternative built with world-class design principles. No gradients, no clutter - just pure functionality in charcoal and white.

## 🎯 Philosophy

Designed with the precision of Apple, the engineering excellence of NVIDIA, the AI capabilities of Meta, and the scale mindset of Google. Every pixel is intentional. Every interaction is smooth. Every feature is essential.

## ✨ Features

### Core Capabilities
- **AI-Powered Code Generation** - Describe what you want to build in natural language
- **Real-Time Code Editor** - Monaco Editor with full TypeScript/JavaScript support
- **Live Preview** - Instant preview with mobile, tablet, and desktop viewports
- **Integrated Terminal** - Full terminal access within the browser
- **File System Management** - Intuitive file tree with full project structure
- **Framework Support** - React, Vue, Next.js, Vite, and more

### Developer Experience
- **Split-View Interface** - Editor, preview, and AI chat side-by-side
- **Tab Management** - Multiple files open simultaneously
- **Syntax Highlighting** - Beautiful code presentation across 20+ languages
- **Auto-Save** - Never lose your work
- **Export to GitHub** - One-click repository creation
- **One-Click Deploy** - Deploy to Vercel, Netlify instantly

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🎨 Design System

### Colors
- **Charcoal 950**: `#0a0a0a` - Darkest backgrounds
- **Charcoal 900**: `#1a1a1a` - Primary background
- **Charcoal 800**: `#2d2d2d` - Secondary background
- **Charcoal 700**: `#404040` - Borders and dividers
- **White**: `#ffffff` - Primary text
- **Gray 50**: `#f5f5f5` - Light backgrounds

### Typography
- **Sans**: SF Pro Display, Segoe UI, Roboto, Helvetica
- **Mono**: SF Mono, Monaco, Cascadia Code, Consolas

### Principles
1. **No gradients** - Solid colors only
2. **Clear hierarchy** - Typography and spacing define importance
3. **60fps animations** - Smooth, performant transitions
4. **Accessible** - WCAG 2.1 AA compliant
5. **Responsive** - Mobile-first design approach

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# AI Provider (OpenAI, Anthropic, etc.)
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key

# GitHub Integration
VITE_GITHUB_TOKEN=your_github_token
```

See `.env.example` for all available options.

## 📁 Project Structure

```
forge/
├── src/
│   ├── components/      # React components
│   ├── services/        # API services
│   ├── stores/          # State management (Zustand)
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── tailwind.config.js   # Tailwind config
└── package.json         # Dependencies
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (custom theme)
- **Code Editor**: Monaco Editor
- **State**: Zustand
- **Icons**: Lucide React

## 🚢 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

MIT License - feel free to use this in your projects

---

**Made with ⚡ by developers, for developers**
