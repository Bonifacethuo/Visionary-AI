
import React, { useRef } from 'react';
import { ImageData } from '../types';

interface ImageUploaderProps {
  onImageSelected: (data: ImageData) => void;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      onImageSelected({
        base64: base64Data,
        mimeType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <div 
        onClick={!isLoading ? triggerUpload : undefined}
        className={`relative group cursor-pointer border-2 border-dashed border-slate-300 rounded-2xl p-12 transition-all flex flex-col items-center justify-center gap-4 ${
          isLoading ? 'opacity-50 cursor-not-allowed bg-slate-50' : 'hover:border-indigo-500 hover:bg-indigo-50/30 active:scale-[0.99]'
        }`}
      >
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-800">
            Click to upload your image
          </p>
          <p className="text-sm text-slate-500 mt-1">
            PNG, JPG, WebP up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
