import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Trash2 } from 'lucide-react';
import { useStore } from '../stores/useStore';
import { generateCode } from '../services/ai';
import { createFile } from '../utils/fileSystem';

export default function ChatPanel() {
  const { messages, addMessage, clearMessages, isGenerating, setIsGenerating, addFile, openTab } = useStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage = input.trim();
    addMessage({
      role: 'user',
      content: userMessage,
    });

    setInput('');
    setIsGenerating(true);

    try {
      // Call AI service
      const response = await generateCode({ prompt: userMessage });

      // Add assistant message
      addMessage({
        role: 'assistant',
        content: response.message,
      });

      // Create files from the response
      response.files.forEach((file) => {
        const newFile = createFile(
          file.path.split('/').pop() || 'new-file.tsx',
          file.path,
          file.content
        );
        addFile(newFile);
        // Auto-open the first file
        if (response.files.indexOf(file) === 0) {
          openTab(newFile);
        }
      });
    } catch (error) {
      addMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      });
      console.error('AI generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-80 bg-charcoal-900 border-l border-charcoal-700 flex flex-col">
      {/* Header */}
      <div className="h-10 px-4 flex items-center justify-between border-b border-charcoal-700">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">AI Assistant</span>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="p-1 hover:bg-charcoal-800 rounded text-gray-400 hover:text-white transition-colors"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Sparkles className="w-12 h-12 text-gray-600 mb-3" />
            <p className="text-gray-400 text-sm mb-2">Start building with AI</p>
            <p className="text-gray-600 text-xs max-w-[240px]">
              Describe what you want to build, and I'll generate the code for you.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    message.role === 'user'
                      ? 'bg-white text-charcoal-900'
                      : 'bg-charcoal-800 text-gray-200'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-charcoal-700">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to build..."
            className="w-full bg-charcoal-800 text-white placeholder-gray-500 rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-charcoal-600 transition-all"
            disabled={isGenerating}
          />
          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white text-charcoal-900 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Press Enter to send
        </p>
      </form>
    </div>
  );
}
