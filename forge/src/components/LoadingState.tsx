import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
        <p className="text-sm text-gray-400">{message}</p>
      </div>
    </div>
  );
}
