import type { ThemeName } from './themes';

export interface Widget {
  id: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
  settings: Record<string, unknown>;
}

export interface LayoutState {
  widgets: Widget[];
  editMode: boolean;
}

export interface GlobalSettings {
  theme: ThemeName;
}
