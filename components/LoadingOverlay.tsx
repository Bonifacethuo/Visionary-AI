
import React from 'react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-20 animate-in fade-in duration-300">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></div>
        </div>
      </div>
      <p className="mt-8 text-lg font-semibold text-slate-900">Neural analysis in progress...</p>
      <p className="mt-2 text-sm text-slate-500 text-center max-w-xs">
        Gemini 3 Pro is deciphering pixels and reconstructing visual context. This usually takes 3-5 seconds.
      </p>
    </div>
  );
};

export default LoadingOverlay;
