import { Clock, FileCode, Zap, Activity } from 'lucide-react';
import { useStore } from '../stores/useStore';

export default function StatusBar() {
  const { tabs, isGenerating } = useStore();
  const activeTabsCount = tabs.length;

  return (
    <div className="h-6 bg-charcoal-950 border-t border-charcoal-700 flex items-center justify-between px-4 text-xs text-gray-400">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <FileCode className="w-3 h-3" />
          <span>{activeTabsCount} {activeTabsCount === 1 ? 'file' : 'files'} open</span>
        </div>

        {isGenerating && (
          <div className="flex items-center gap-1.5 animate-pulse">
            <Activity className="w-3 h-3 text-white" />
            <span className="text-white">AI Generating...</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3 h-3" />
          <span>Forge v1.0.0</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
}
