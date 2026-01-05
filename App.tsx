
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import AnalysisDisplay from './components/AnalysisDisplay';
import LoadingOverlay from './components/LoadingOverlay';
import { analyzeImage } from './services/gemini';
import { ImageData, AnalysisResult, AnalysisMode } from './types';

const App: React.FC = () => {
  const [image, setImage] = useState<ImageData | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<AnalysisMode>(AnalysisMode.GENERAL);

  const handleImageSelected = useCallback(async (imgData: ImageData) => {
    setImage(imgData);
    setPreviewUrl(`data:${imgData.mimeType};base64,${imgData.base64}`);
    setResult(null);
    setError(null);
    setLoading(true);

    try {
      const analysis = await analyzeImage(imgData, mode);
      setResult(analysis);
    } catch (err) {
      setError("Failed to analyze image. Please check your API configuration or try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [mode]);

  const reset = () => {
    setImage(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
            See the world through <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">AI eyes.</span>
          </h2>
          <p className="text-lg text-slate-600">
            Upload any image and let Gemini 3 Pro provide a deep, contextual analysis in seconds.
          </p>
        </div>

        {/* Configuration Bar */}
        {!result && !loading && (
          <div className="max-w-2xl mx-auto mb-8 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2 justify-center">
            {Object.values(AnalysisMode).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  mode === m 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        )}

        {/* Content Area */}
        <div className="w-full">
          {!previewUrl && !loading && (
            <div className="max-w-xl mx-auto">
              <ImageUploader onImageSelected={handleImageSelected} isLoading={loading} />
              
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-40">
                <div className="h-24 bg-slate-200 rounded-2xl animate-pulse"></div>
                <div className="h-24 bg-slate-200 rounded-2xl animate-pulse"></div>
                <div className="h-24 bg-slate-200 rounded-2xl animate-pulse"></div>
                <div className="h-24 bg-slate-200 rounded-2xl animate-pulse"></div>
              </div>
            </div>
          )}

          {loading && <LoadingOverlay />}

          {error && (
            <div className="max-w-md mx-auto mt-8 bg-red-50 border border-red-200 p-6 rounded-3xl text-center">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-red-900 mb-2">Analysis Failed</h3>
              <p className="text-red-700 mb-6">{error}</p>
              <button 
                onClick={reset}
                className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {result && previewUrl && !loading && (
            <div className="flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Analysis Results</h2>
                <button 
                  onClick={reset}
                  className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  New Analysis
                </button>
              </div>
              <AnalysisDisplay result={result} imagePreview={previewUrl} />
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            Powered by <strong>Gemini 3 Pro</strong> • Built with React & Tailwind CSS
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">API Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
