export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  path: string;
}

export interface Tab {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface Project {
  id: string;
  name: string;
  files: FileNode[];
  framework: 'react' | 'vue' | 'next' | 'vite' | 'vanilla';
}

export type ViewMode = 'split' | 'editor' | 'preview';
