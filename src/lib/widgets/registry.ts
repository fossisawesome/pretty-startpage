import type { ComponentType, SvelteComponent } from 'svelte';
import Clock from './Clock.svelte';
import ClockSettings from './ClockSettings.svelte';
import Search from './Search.svelte';
import SearchSettings from './SearchSettings.svelte';
import Weather from './Weather.svelte';
import WeatherSettings from './WeatherSettings.svelte';
import Bookmarks from './Bookmarks.svelte';
import BookmarksSettings from './BookmarksSettings.svelte';
import Notes from './Notes.svelte';
import NotesSettings from './NotesSettings.svelte';
import Quote from './Quote.svelte';
import QuoteSettings from './QuoteSettings.svelte';

export interface WidgetDef {
  label: string;
  defaultW: number;
  defaultH: number;
  defaultSettings: Record<string, unknown>;
  component: ComponentType<SvelteComponent>;
  settingsComponent: ComponentType<SvelteComponent>;
}

export const WIDGET_DEFS: Record<string, WidgetDef> = {
  clock: {
    label: 'Clock',
    defaultW: 260,
    defaultH: 110,
    defaultSettings: { hourFormat: 'auto', timezone: 'system', clockFont: "'M PLUS 1 Code', monospace", showSeconds: false },
    component: Clock,
    settingsComponent: ClockSettings,
  },
  search: {
    label: 'Search',
    defaultW: 540,
    defaultH: 70,
    defaultSettings: { searchUrl: 'https://duckduckgo.com/?q={q}', placeholder: '' },
    component: Search,
    settingsComponent: SearchSettings,
  },
  weather: {
    label: 'Weather',
    defaultW: 280,
    defaultH: 160,
    defaultSettings: { city: 'London', units: 'metric' },
    component: Weather,
    settingsComponent: WeatherSettings,
  },
  bookmarks: {
    label: 'Bookmarks',
    defaultW: 300,
    defaultH: 180,
    defaultSettings: { links: [] },
    component: Bookmarks,
    settingsComponent: BookmarksSettings,
  },
  notes: {
    label: 'Notes',
    defaultW: 260,
    defaultH: 200,
    defaultSettings: { text: '' },
    component: Notes,
    settingsComponent: NotesSettings,
  },
  quote: {
    label: 'Quote',
    defaultW: 300,
    defaultH: 140,
    defaultSettings: { index: 0 },
    component: Quote,
    settingsComponent: QuoteSettings,
  },
};
