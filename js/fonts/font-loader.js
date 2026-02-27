/* ============================================================
   FONT LOADER — Lazy load fonts from Google Fonts
   ============================================================ */
import { buildGoogleFontsUrl } from './font-data.js';

let loaded = false;

/**
 * Load all Google Fonts at once (they are lazy-rendered by the browser)
 */
export function loadAllFonts() {
    if (loaded) return Promise.resolve();
    loaded = true;

    const url = buildGoogleFontsUrl();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);

    return document.fonts.ready;
}

/**
 * Check if a specific font family is loaded
 */
export function isFontLoaded(family) {
    const clean = family.replace(/'/g, '').split(',')[0].trim();
    return document.fonts.check(`16px "${clean}"`);
}

/**
 * Wait for a specific font to load
 */
export async function waitForFont(family) {
    const clean = family.replace(/'/g, '').split(',')[0].trim();
    try {
        await document.fonts.load(`16px "${clean}"`);
    } catch (e) {
        // Font might not be available, silently fail
    }
}
