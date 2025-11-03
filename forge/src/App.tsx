import { useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import ChatPanel from './components/ChatPanel';
import Terminal from './components/Terminal';
import StatusBar from './components/StatusBar';
import { useStore } from './stores/useStore';
import type { FileNode } from './types';

function App() {
  const { addFile, terminalOpen } = useStore();

  // Initialize with a sample project structure
  useEffect(() => {
    const sampleFiles: FileNode[] = [
      {
        id: '1',
        name: 'src',
        type: 'folder',
        path: '/src',
        children: [
          {
            id: '2',
            name: 'App.tsx',
            type: 'file',
            path: '/src/App.tsx',
            content: `import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Forge
        </h1>
        <p className="text-gray-600">
          Start building with AI assistance
        </p>
      </div>
    </div>
  );
}

export default App;
`,
          },
          {
            id: '3',
            name: 'index.css',
            type: 'file',
            path: '/src/index.css',
            content: `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
          },
        ],
      },
      {
        id: '4',
        name: 'package.json',
        type: 'file',
        path: '/package.json',
        content: `{
  "name": "my-project",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0"
  }
}
`,
      },
    ];

    sampleFiles.forEach(file => addFile(file));
  }, [addFile]);

  return (
    <div className="h-screen flex flex-col bg-charcoal-900 text-white overflow-hidden">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex overflow-hidden">
          <CodeEditor />
          <Preview />
        </div>

        <ChatPanel />
      </div>

      {terminalOpen && <Terminal />}

      <StatusBar />
    </div>
  );
}

export default App;
