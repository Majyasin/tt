import { Terminal, Layout } from 'lucide-react';
import { useStore } from '../stores/useStore';

export default function QuickActions() {
  const { toggleTerminal, toggleSidebar, terminalOpen, sidebarOpen } = useStore();

  const actions = [
    {
      icon: Layout,
      label: 'Toggle Sidebar',
      action: toggleSidebar,
      active: sidebarOpen,
      shortcut: '⌘B',
    },
    {
      icon: Terminal,
      label: 'Toggle Terminal',
      action: toggleTerminal,
      active: terminalOpen,
      shortcut: '⌘J',
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-charcoal-800 border border-charcoal-700 rounded-lg shadow-2xl p-2 flex items-center gap-1">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`
              group relative px-3 py-2 rounded-md transition-all duration-150
              ${action.active
                ? 'bg-white text-charcoal-900'
                : 'text-gray-400 hover:text-white hover:bg-charcoal-700'
              }
            `}
            title={`${action.label} (${action.shortcut})`}
          >
            <action.icon className="w-4 h-4" />

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-charcoal-950 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {action.label}
              <span className="text-gray-500 ml-2">{action.shortcut}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
