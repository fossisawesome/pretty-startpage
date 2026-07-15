export type ThemeName = 'mocha' | 'latte' | 'frappe' | 'macchiato';

export interface Theme {
  name: string;
  colors: Record<string, string>;
}

export const THEMES: Record<ThemeName, Theme> = {
  mocha: {
    name: 'Catppuccin Mocha',
    colors: {
      '--bg': '#11111b', '--surface': '#1e1e2e', '--surface2': '#181825',
      '--text': '#cdd6f4', '--subtext': '#a6adc8', '--accent': '#cba6f7',
      '--accent2': '#89b4fa', '--border': '#313244', '--red': '#f38ba8',
      '--green': '#a6e3a1',
    },
  },
  latte: {
    name: 'Catppuccin Latte',
    colors: {
      '--bg': '#eff1f5', '--surface': '#e6e9f0', '--surface2': '#dce0e8',
      '--text': '#4c4f69', '--subtext': '#626d83', '--accent': '#d20f39',
      '--accent2': '#1e66f5', '--border': '#bcc0cc', '--red': '#d20f39',
      '--green': '#40a02b',
    },
  },
  frappe: {
    name: 'Catppuccin Frappe',
    colors: {
      '--bg': '#292c3c', '--surface': '#303446', '--surface2': '#292c3c',
      '--text': '#c6d0f5', '--subtext': '#949cbb', '--accent': '#ca9ee6',
      '--accent2': '#85c1dc', '--border': '#414559', '--red': '#e78284',
      '--green': '#a6d189',
    },
  },
  macchiato: {
    name: 'Catppuccin Macchiato',
    colors: {
      '--bg': '#24273a', '--surface': '#2e303e', '--surface2': '#1e1e2e',
      '--text': '#cad3f5', '--subtext': '#8087a2', '--accent': '#c6a0f6',
      '--accent2': '#8aadf4', '--border': '#3b3f52', '--red': '#ed8796',
      '--green': '#a6da95',
    },
  },
};

export function applyTheme(name: ThemeName): void {
  document.documentElement.dataset.theme = name;
  const theme = THEMES[name];
  for (const [prop, value] of Object.entries(theme.colors)) {
    document.documentElement.style.setProperty(prop, value);
  }
}
