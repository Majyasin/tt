import { Code2, Github, Download, Play, Loader2, Settings, ChevronDown } from 'lucide-react';
import { useStore } from '../stores/useStore';

export default function Header() {
  const { projectName, isGenerating } = useStore();

  return (
    <header className="h-14 bg-charcoal-900 border-b border-charcoal-700 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 group">
          <Code2 className="w-6 h-6 text-white transition-transform duration-200 group-hover:scale-110" strokeWidth={2} />
          <span className="text-lg font-semibold text-white tracking-tight">FORGE</span>
        </div>
        <div className="h-6 w-px bg-charcoal-700" />
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-150 group">
          <span>{projectName}</span>
          <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        {isGenerating && (
          <div className="flex items-center gap-2 text-sm text-white">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Generating code...</span>
          </div>
        )}
        <button
          className="px-4 py-1.5 bg-charcoal-800 hover:bg-charcoal-700 text-white text-sm font-medium rounded-md transition-all duration-150 flex items-center gap-2 hover:scale-105 active:scale-95"
          title="Run Project"
        >
          <Play className="w-4 h-4" />
          Run
        </button>
        <button
          className="px-4 py-1.5 bg-charcoal-800 hover:bg-charcoal-700 text-white text-sm font-medium rounded-md transition-all duration-150 flex items-center gap-2 hover:scale-105 active:scale-95"
          title="Export to GitHub"
        >
          <Github className="w-4 h-4" />
          Export
        </button>
        <button
          className="px-4 py-1.5 bg-white hover:bg-gray-50 text-charcoal-900 text-sm font-medium rounded-md transition-all duration-150 flex items-center gap-2 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
          title="Deploy"
        >
          <Download className="w-4 h-4" />
          Deploy
        </button>
        <div className="h-6 w-px bg-charcoal-700 ml-1" />
        <button
          className="p-2 text-gray-400 hover:text-white hover:bg-charcoal-800 rounded-md transition-all duration-150 hover:rotate-90"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
