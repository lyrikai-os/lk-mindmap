import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { installBrowserBridge } from './browser-bridge';
// Relative to index.html so packaged file:// loads dist/fonts (not file:/// → esm.sh fallback).
window.EXCALIDRAW_ASSET_PATH = new URL('./', window.location.href).href;
installBrowserBridge();
void import('./App').then(({ default: App }) => createRoot(document.getElementById('root')!).render(<App />));
