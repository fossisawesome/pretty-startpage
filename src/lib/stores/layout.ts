import { writable } from 'svelte/store';
import type { LayoutState, Widget } from '../types';

export const GRID = 20;
const STORAGE_KEY = 'startpage-v2';

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function snap(v: number): number {
  return Math.round(v / GRID) * GRID;
}

function loadInitial(): LayoutState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as LayoutState;
  } catch (e) {
    console.error(e);
  }
  const cw = window.innerWidth;
  const ch = window.innerHeight;
  return {
    editMode: false,
    widgets: [
      {
        id: uid(), type: 'clock',
        x: snap(cw / 2 - 130), y: snap(ch / 2 - 120), w: 260, h: 110,
        settings: { hourFormat: 'auto', timezone: 'system', clockFont: "'M PLUS 1 Code', monospace", showSeconds: false },
      },
      {
        id: uid(), type: 'search',
        x: snap(cw / 2 - 270), y: snap(ch / 2 + 10), w: 540, h: 70,
        settings: { searchUrl: 'https://duckduckgo.com/?q={q}', placeholder: '' },
      },
    ],
  };
}

export const layout = writable<LayoutState>(loadInitial());

layout.subscribe((state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
});

export function addWidget(type: string, defaults: { w: number; h: number; settings: Record<string, unknown> }): void {
  const cw = window.innerWidth;
  const ch = window.innerHeight;
  const id = uid();
  layout.update((state) => ({
    ...state,
    widgets: [
      ...state.widgets,
      {
        id, type,
        x: snap(Math.max(0, cw / 2 - defaults.w / 2)),
        y: snap(Math.max(0, ch / 2 - defaults.h / 2)),
        w: defaults.w, h: defaults.h,
        settings: { ...defaults.settings },
      },
    ],
  }));
}

export function removeWidget(id: string): void {
  layout.update((state) => ({ ...state, widgets: state.widgets.filter((w) => w.id !== id) }));
}

export function updateWidget(id: string, patch: Partial<Widget>): void {
  layout.update((state) => ({
    ...state,
    widgets: state.widgets.map((w) => (w.id === id ? { ...w, ...patch } : w)),
  }));
}
