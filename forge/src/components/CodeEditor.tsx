import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { X } from 'lucide-react';
import { useStore } from '../stores/useStore';

export default function CodeEditor() {
  const { tabs, activeTab, closeTab, setActiveTab, updateFile } = useStore();
  const editorRef = useRef<any>(null);

  const currentTab = tabs.find(t => t.id === activeTab);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;

    // Configure editor for better UX
    editor.updateOptions({
      fontSize: 13,
      fontFamily: 'SF Mono, Monaco, Cascadia Code, Consolas, Courier New, monospace',
      lineHeight: 20,
      padding: { top: 16, bottom: 16 },
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      renderLineHighlight: 'all',
      guides: {
        indentation: true,
      },
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    if (currentTab && value !== undefined) {
      updateFile(currentTab.path, value);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-charcoal-900">
      {/* Tabs */}
      <div className="h-10 bg-charcoal-900 border-b border-charcoal-700 flex items-center gap-px overflow-x-auto scrollbar-thin">
        {tabs.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
            No file open
          </div>
        ) : (
          tabs.map((tab) => (
            <div
              key={tab.id}
              className={`
                group flex items-center gap-2 px-4 h-full border-r border-charcoal-700 cursor-pointer transition-colors
                ${tab.id === activeTab
                  ? 'bg-charcoal-800 text-white'
                  : 'bg-charcoal-900 text-gray-400 hover:bg-charcoal-800 hover:text-gray-200'
                }
              `}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="text-sm whitespace-nowrap">{tab.name}</span>
              <button
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-charcoal-700 rounded transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        {currentTab ? (
          <Editor
            height="100%"
            language={currentTab.language}
            value={currentTab.content}
            theme="vs-dark"
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <p className="text-lg mb-2">No file selected</p>
              <p className="text-sm">Open a file from the sidebar or start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
