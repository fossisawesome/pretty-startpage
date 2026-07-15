import { writable } from 'svelte/store';
import type { GlobalSettings } from '../types';
import type { ThemeName } from '../themes';

const STORAGE_KEY = 'startpage-global';

function loadInitial(): GlobalSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { theme: 'mocha', ...JSON.parse(raw) } as GlobalSettings;
  } catch (e) {
    console.error(e);
  }
  return { theme: 'mocha' };
}

export const settings = writable<GlobalSettings>(loadInitial());

settings.subscribe((state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
});

export function setTheme(theme: ThemeName): void {
  settings.update((s) => ({ ...s, theme }));
}
