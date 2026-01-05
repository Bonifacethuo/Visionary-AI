
import React from 'react';
import { AnalysisResult } from '../types';

interface AnalysisDisplayProps {
  result: AnalysisResult;
  imagePreview: string;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result, imagePreview }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Image Preview Card */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 overflow-hidden">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
          <img 
            src={imagePreview} 
            alt="Uploaded Preview" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4 p-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-slate-700">Analysis Complete</span>
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div className="flex flex-col gap-6">
        {/* Quick Summary */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Executive Summary</h3>
          <p className="text-lg text-slate-800 font-medium leading-relaxed">
            {result.summary}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Visual Vibe</h3>
            <p className="text-slate-700">{result.vibe}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Detected Palette</h3>
            <div className="flex flex-wrap gap-2">
              {result.colors.map((color, i) => (
                <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                  {color}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tags / Objects */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Identified Objects</h3>
          <div className="flex flex-wrap gap-2">
            {result.objects.map((obj, i) => (
              <span key={i} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-bold border border-indigo-100">
                {obj}
              </span>
            ))}
          </div>
        </div>

        {/* Detailed Description */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">In-Depth Context</h3>
          <p className="text-slate-600 leading-relaxed italic">
            "{result.details}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDisplay;
