
export type AppView = 'DASHBOARD' | 'VIDEO_GEN' | 'IMAGE_GEN' | 'MUSIC_GEN' | 'VIDEO_EDITOR' | 'SPORTS_HUB';

export interface VideoGenerationState {
  isGenerating: boolean;
  status: string;
  resultUrl: string | null;
  error: string | null;
}

export interface ImageGenerationState {
  isGenerating: boolean;
  resultUrl: string | null;
  error: string | null;
}

export interface AudioGenerationState {
  isGenerating: boolean;
  audioUrl: string | null;
}

export interface VideoEditParams {
  speed: number;
  qualityBoost: boolean;
  subtitleText: string;
}
