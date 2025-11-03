import { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, Plus } from 'lucide-react';
import { useStore } from '../stores/useStore';
import type { FileNode } from '../types';

export default function Sidebar() {
  const { files, openTab, sidebarOpen } = useStore();

  if (!sidebarOpen) return null;

  return (
    <div className="w-64 bg-charcoal-900 border-r border-charcoal-700 flex flex-col">
      <div className="h-10 px-4 flex items-center justify-between border-b border-charcoal-700">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Files</span>
        <button className="p-1 hover:bg-charcoal-800 rounded text-gray-400 hover:text-white transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm">
            <Folder className="w-12 h-12 mb-2 opacity-50" />
            <p>No files yet</p>
            <p className="text-xs mt-1">Start by creating a prompt</p>
          </div>
        ) : (
          <FileTree files={files} onFileClick={openTab} />
        )}
      </div>
    </div>
  );
}

interface FileTreeProps {
  files: FileNode[];
  onFileClick: (file: FileNode) => void;
  level?: number;
}

function FileTree({ files, onFileClick, level = 0 }: FileTreeProps) {
  return (
    <div>
      {files.map((file) => (
        <FileTreeNode
          key={file.id}
          file={file}
          onFileClick={onFileClick}
          level={level}
        />
      ))}
    </div>
  );
}

interface FileTreeNodeProps {
  file: FileNode;
  onFileClick: (file: FileNode) => void;
  level: number;
}

function FileTreeNode({ file, onFileClick, level }: FileTreeNodeProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    if (file.type === 'folder') {
      setIsOpen(!isOpen);
    } else {
      onFileClick(file);
    }
  };

  return (
    <div>
      <div
        className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-charcoal-800 rounded cursor-pointer transition-colors group"
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleClick}
      >
        {file.type === 'folder' && (
          <span className="text-gray-400">
            {isOpen ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </span>
        )}
        {file.type === 'folder' ? (
          isOpen ? (
            <FolderOpen className="w-4 h-4 text-gray-400" />
          ) : (
            <Folder className="w-4 h-4 text-gray-400" />
          )
        ) : (
          <File className="w-4 h-4 text-gray-400" />
        )}
        <span className="text-sm text-gray-200 flex-1">{file.name}</span>
      </div>
      {file.type === 'folder' && isOpen && file.children && (
        <FileTree
          files={file.children}
          onFileClick={onFileClick}
          level={level + 1}
        />
      )}
    </div>
  );
}
