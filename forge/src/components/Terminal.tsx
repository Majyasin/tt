import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Trash2 } from 'lucide-react';
import { useStore } from '../stores/useStore';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error';
  content: string;
}

export default function Terminal() {
  const { terminalOpen, toggleTerminal } = useStore();
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'output', content: 'Forge Terminal v1.0.0' },
    { id: '2', type: 'output', content: 'Type "help" for available commands' },
  ]);
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [terminalOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.trim();

    // Add command to terminal
    setLines(prev => [...prev, {
      id: Date.now().toString(),
      type: 'command',
      content: `$ ${command}`,
    }]);

    // Simple command handling
    let output = '';
    if (command === 'help') {
      output = 'Available commands:\n  clear - Clear terminal\n  help - Show this message\n  npm install - Install dependencies\n  npm run dev - Start development server';
    } else if (command === 'clear') {
      setLines([]);
      setInput('');
      return;
    } else {
      output = `Command not found: ${command}`;
    }

    setLines(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      type: 'output',
      content: output,
    }]);

    setInput('');
  };

  const handleClear = () => {
    setLines([]);
  };

  if (!terminalOpen) return null;

  return (
    <div className="h-64 bg-charcoal-950 border-t border-charcoal-700 flex flex-col">
      {/* Terminal Header */}
      <div className="h-8 bg-charcoal-900 border-b border-charcoal-700 flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Terminal</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleClear}
            className="p-1 hover:bg-charcoal-800 rounded text-gray-400 hover:text-white transition-colors"
            title="Clear terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={toggleTerminal}
            className="p-1 hover:bg-charcoal-800 rounded text-gray-400 hover:text-white transition-colors"
            title="Close terminal"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto scrollbar-thin p-3 font-mono text-xs"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className={`mb-1 ${
              line.type === 'command'
                ? 'text-white'
                : line.type === 'error'
                ? 'text-red-400'
                : 'text-gray-400'
            }`}
          >
            <pre className="whitespace-pre-wrap break-words">{line.content}</pre>
          </div>
        ))}
      </div>

      {/* Terminal Input */}
      <form onSubmit={handleSubmit} className="px-3 pb-3">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-white">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none"
            placeholder="Type a command..."
          />
        </div>
      </form>
    </div>
  );
}
