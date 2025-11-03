import { create } from 'zustand';
import type { FileNode, Tab, Message, ViewMode } from '../types';

interface AppState {
  // Files
  files: FileNode[];
  activeFile: string | null;
  setActiveFile: (path: string) => void;
  updateFile: (path: string, content: string) => void;
  addFile: (file: FileNode) => void;
  deleteFile: (path: string) => void;

  // Tabs
  tabs: Tab[];
  activeTab: string | null;
  openTab: (file: FileNode) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTabContent: (id: string, content: string) => void;

  // Chat
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;

  // UI
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  terminalOpen: boolean;
  toggleTerminal: () => void;

  // Project
  projectName: string;
  setProjectName: (name: string) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Files
  files: [],
  activeFile: null,
  setActiveFile: (path) => set({ activeFile: path }),
  updateFile: (path, content) => {
    const updateFileContent = (files: FileNode[]): FileNode[] => {
      return files.map((file) => {
        if (file.path === path && file.type === 'file') {
          return { ...file, content };
        }
        if (file.children) {
          return { ...file, children: updateFileContent(file.children) };
        }
        return file;
      });
    };
    set({ files: updateFileContent(get().files) });

    // Also update the tab if it's open
    const tabs = get().tabs;
    const tab = tabs.find(t => t.path === path);
    if (tab) {
      get().updateTabContent(tab.id, content);
    }
  },
  addFile: (file) => set({ files: [...get().files, file] }),
  deleteFile: (path) => {
    const deleteFileRecursive = (files: FileNode[]): FileNode[] => {
      return files.filter(file => {
        if (file.path === path) return false;
        if (file.children) {
          file.children = deleteFileRecursive(file.children);
        }
        return true;
      });
    };
    set({ files: deleteFileRecursive(get().files) });
  },

  // Tabs
  tabs: [],
  activeTab: null,
  openTab: (file) => {
    const tabs = get().tabs;
    const existing = tabs.find(t => t.path === file.path);

    if (existing) {
      set({ activeTab: existing.id });
    } else {
      const newTab: Tab = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        path: file.path,
        content: file.content || '',
        language: getLanguageFromFileName(file.name),
      };
      set({ tabs: [...tabs, newTab], activeTab: newTab.id });
    }
  },
  closeTab: (id) => {
    const tabs = get().tabs.filter(t => t.id !== id);
    set({ tabs });
    if (get().activeTab === id) {
      set({ activeTab: tabs.length > 0 ? tabs[tabs.length - 1].id : null });
    }
  },
  setActiveTab: (id) => set({ activeTab: id }),
  updateTabContent: (id, content) => {
    const tabs = get().tabs.map(tab =>
      tab.id === id ? { ...tab, content } : tab
    );
    set({ tabs });
  },

  // Chat
  messages: [],
  addMessage: (message) => {
    const newMessage: Message = {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    set({ messages: [...get().messages, newMessage] });
  },
  clearMessages: () => set({ messages: [] }),

  // UI
  viewMode: 'split',
  setViewMode: (mode) => set({ viewMode: mode }),
  sidebarOpen: true,
  toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
  terminalOpen: false,
  toggleTerminal: () => set({ terminalOpen: !get().terminalOpen }),

  // Project
  projectName: 'My Project',
  setProjectName: (name) => set({ projectName: name }),
  isGenerating: false,
  setIsGenerating: (generating) => set({ isGenerating: generating }),
}));

function getLanguageFromFileName(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const languageMap: Record<string, string> = {
    'ts': 'typescript',
    'tsx': 'typescript',
    'js': 'javascript',
    'jsx': 'javascript',
    'json': 'json',
    'css': 'css',
    'scss': 'scss',
    'html': 'html',
    'md': 'markdown',
    'py': 'python',
    'go': 'go',
    'rs': 'rust',
  };
  return languageMap[ext || ''] || 'plaintext';
}
