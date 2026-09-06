import type { CSSProperties } from 'react';
import type { BoardTheme } from './contract';
import { DEFAULT_THEME } from './contract';

export type ThemePreset = { id: string; name: string; theme: BoardTheme };

export const THEME_PRESETS: ThemePreset[] = [
  { id: 'paper', name: 'Paper', theme: { ...DEFAULT_THEME } },
  { id: 'graphite', name: 'Graphite', theme: { background: '#e8ebef', grid: 'lines', gridColor: '#b8c0cc', spacing: 28 } },
  { id: 'night', name: 'Night', theme: { background: '#1e2228', grid: 'dots', gridColor: '#3c4450', spacing: 24 } },
];

export function themeBackground(theme: BoardTheme, camera: { x: number; y: number; zoom: number }): CSSProperties {
  const spacing = theme.spacing * camera.zoom;
  return {
    backgroundColor: theme.background,
    backgroundImage:
      theme.grid === 'dots'
        ? `radial-gradient(${theme.gridColor} 1px, transparent 1px)`
        : theme.grid === 'lines'
          ? `linear-gradient(${theme.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)`
          : 'none',
    backgroundSize: `${spacing}px ${spacing}px`,
    backgroundPosition: `${camera.x * camera.zoom}px ${camera.y * camera.zoom}px`,
  };
}
