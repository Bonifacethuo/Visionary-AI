
export interface AnalysisResult {
  summary: string;
  objects: string[];
  colors: string[];
  vibe: string;
  details: string;
}

export interface ImageData {
  base64: string;
  mimeType: string;
}

export enum AnalysisMode {
  GENERAL = 'General Analysis',
  TECHNICAL = 'Technical Details',
  ARTISTIC = 'Artistic Critique',
  PRODUCT = 'Product Inspection'
}
