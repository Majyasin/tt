import type { FileNode } from '../types';

/**
 * Generate a unique ID for files and folders
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Find a file in the file tree by path
 */
export function findFileByPath(
  files: FileNode[],
  path: string
): FileNode | null {
  for (const file of files) {
    if (file.path === path) {
      return file;
    }
    if (file.children) {
      const found = findFileByPath(file.children, path);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Create a new file node
 */
export function createFile(
  name: string,
  path: string,
  content = ''
): FileNode {
  return {
    id: generateId(),
    name,
    path,
    type: 'file',
    content,
  };
}

/**
 * Create a new folder node
 */
export function createFolder(
  name: string,
  path: string,
  children: FileNode[] = []
): FileNode {
  return {
    id: generateId(),
    name,
    path,
    type: 'folder',
    children,
  };
}

/**
 * Convert file tree to a flat structure for export
 */
export function flattenFileTree(files: FileNode[]): Record<string, string> {
  const result: Record<string, string> = {};

  function traverse(nodes: FileNode[]) {
    for (const node of nodes) {
      if (node.type === 'file' && node.content) {
        result[node.path] = node.content;
      }
      if (node.children) {
        traverse(node.children);
      }
    }
  }

  traverse(files);
  return result;
}

/**
 * Export files as a downloadable ZIP (requires a library like JSZip)
 * This is a placeholder - implement with JSZip or similar
 */
export async function exportAsZip(files: FileNode[]): Promise<Blob> {
  const flatFiles = flattenFileTree(files);

  // TODO: Implement with JSZip
  // For now, return a simple text file with file structure
  const structure = JSON.stringify(flatFiles, null, 2);
  return new Blob([structure], { type: 'application/json' });
}

/**
 * Generate a GitHub repository structure
 */
export function generateGitHubStructure(files: FileNode[]): {
  files: Array<{ path: string; content: string }>;
  readme: string;
} {
  const flatFiles = flattenFileTree(files);
  const fileArray = Object.entries(flatFiles).map(([path, content]) => ({
    path: path.startsWith('/') ? path.slice(1) : path,
    content,
  }));

  const readme = `# Project

This project was created with Forge - an AI-powered development platform.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Features

- Built with modern web technologies
- AI-assisted development
- Live preview and hot reload

## Deployment

Deploy this project to Vercel, Netlify, or any static hosting service.

\`\`\`bash
npm run build
\`\`\`
`;

  return {
    files: fileArray,
    readme,
  };
}
