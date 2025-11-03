import { useState } from 'react';
import { RefreshCw, Smartphone, Tablet, Monitor, ExternalLink } from 'lucide-react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export default function Preview() {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const deviceWidths = {
    mobile: '375px',
    tablet: '768px',
    desktop: '100%',
  };

  return (
    <div className="flex-1 bg-charcoal-900 flex flex-col">
      {/* Preview Header */}
      <div className="h-10 bg-charcoal-900 border-b border-charcoal-700 flex items-center justify-between px-4">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Preview</span>

        <div className="flex items-center gap-2">
          {/* Device Selector */}
          <div className="flex items-center gap-1 bg-charcoal-800 rounded-md p-1">
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded transition-colors ${
                device === 'mobile'
                  ? 'bg-white text-charcoal-900'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Mobile view"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-1.5 rounded transition-colors ${
                device === 'tablet'
                  ? 'bg-white text-charcoal-900'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Tablet view"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded transition-colors ${
                device === 'desktop'
                  ? 'bg-white text-charcoal-900'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Desktop view"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-px h-6 bg-charcoal-700" />

          {/* Actions */}
          <button
            onClick={handleRefresh}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-charcoal-800 rounded transition-colors"
            title="Refresh preview"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            className="p-1.5 text-gray-400 hover:text-white hover:bg-charcoal-800 rounded transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 bg-charcoal-800 p-4 overflow-auto scrollbar-thin">
        <div
          className="bg-white h-full mx-auto transition-all duration-300 rounded-lg shadow-2xl overflow-hidden"
          style={{ width: deviceWidths[device], maxWidth: '100%' }}
        >
          <iframe
            key={isRefreshing ? Date.now() : 'preview'}
            className="w-full h-full border-0"
            title="Preview"
            sandbox="allow-scripts allow-same-origin allow-forms"
            srcDoc={`
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <style>
                    body {
                      margin: 0;
                      padding: 20px;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                      -webkit-font-smoothing: antialiased;
                      -moz-osx-font-smoothing: grayscale;
                    }
                  </style>
                </head>
                <body>
                  <div id="root">
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; color: #666;">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px;">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                      <h2 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 600; color: #333;">Live Preview</h2>
                      <p style="margin: 0; font-size: 14px; color: #999;">Your app will appear here when you start building</p>
                    </div>
                  </div>
                </body>
              </html>
            `}
          />
        </div>
      </div>
    </div>
  );
}
