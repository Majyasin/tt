import { Code2, Github, Download, Play } from 'lucide-react';
import { useStore } from '../stores/useStore';

export default function Header() {
  const { projectName, isGenerating } = useStore();

  return (
    <header className="h-14 bg-charcoal-900 border-b border-charcoal-700 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-6 h-6 text-white" strokeWidth={2} />
          <span className="text-lg font-semibold text-white tracking-tight">FORGE</span>
        </div>
        <div className="h-6 w-px bg-charcoal-700" />
        <span className="text-sm text-gray-400">{projectName}</span>
      </div>

      <div className="flex items-center gap-3">
        {isGenerating && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>Generating...</span>
          </div>
        )}
        <button
          className="px-4 py-1.5 bg-charcoal-800 hover:bg-charcoal-700 text-white text-sm font-medium rounded-md transition-colors duration-150 flex items-center gap-2"
          title="Run Project"
        >
          <Play className="w-4 h-4" />
          Run
        </button>
        <button
          className="px-4 py-1.5 bg-charcoal-800 hover:bg-charcoal-700 text-white text-sm font-medium rounded-md transition-colors duration-150 flex items-center gap-2"
          title="Export to GitHub"
        >
          <Github className="w-4 h-4" />
          Export
        </button>
        <button
          className="px-4 py-1.5 bg-white hover:bg-gray-50 text-charcoal-900 text-sm font-medium rounded-md transition-colors duration-150 flex items-center gap-2"
          title="Deploy"
        >
          <Download className="w-4 h-4" />
          Deploy
        </button>
      </div>
    </header>
  );
}
