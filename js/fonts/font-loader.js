/* ============================================================
   FONT LOADER — Lazy load calligraphy fonts from Google Fonts
   ============================================================
   • Loads fonts via two <link rel="stylesheet"> tags to stay
     safely under the ~2 000 character URL limit.
   • Adds font-display=swap (via the &display=swap param) so
     text stays visible while fonts download (no FOIT).
   • Handles errors gracefully — if one batch fails the other
     still loads, and the user can retry.
   ============================================================ */
import { buildGoogleFontsUrls } from './font-data.js';

let loaded = false;

/**
 * Inject Google Fonts stylesheets into <head>.
 * Returns a Promise that resolves when all font faces are ready.
 */
export function loadAllFonts() {
    if (loaded) return document.fonts.ready;
    loaded = true;

    const urls = buildGoogleFontsUrls();

    urls.forEach((url, index) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        /* Lower priority — UI fonts (Inter, Playfair) are already in <head> */
        link.media = 'print';

        /* Handle load errors: reset flag so user can retry */
        link.onerror = () => {
            console.warn(`[font-loader] Failed to load font batch ${index + 1}`);
            loaded = false;                       // allow retry on next call
        };

        /* Swap media to 'all' once loaded so fonts become active */
        link.onload = () => {
            link.media = 'all';
        };

        document.head.appendChild(link);
    });

    return document.fonts.ready;
}

/**
 * Check if a specific font family is currently loaded.
 * @param {string} family — e.g. "'Great Vibes', cursive"
 */
export function isFontLoaded(family) {
    const clean = family.replace(/'/g, '').split(',')[0].trim();
    return document.fonts.check(`16px "${clean}"`);
}

/**
 * Wait for a specific font to finish loading.
 * @param {string} family — e.g. "'Amiri', serif"
 */
export async function waitForFont(family) {
    const clean = family.replace(/'/g, '').split(',')[0].trim();
    try {
        await document.fonts.load(`16px "${clean}"`);
    } catch {
        /* Font might not be available (local-only), silently fall back */
    }
}
