/* ============================================================
   FAVORITES — localStorage-based favorite fonts
   ============================================================ */

const STORAGE_KEY = 'rcfg-favorites';

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveFavorites(favs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

export function isFavorite(fontId) {
    return getFavorites().includes(fontId);
}

export function toggleFavorite(fontId) {
    const favs = getFavorites();
    const idx = favs.indexOf(fontId);
    if (idx === -1) {
        favs.push(fontId);
    } else {
        favs.splice(idx, 1);
    }
    saveFavorites(favs);
    return favs.includes(fontId);
}

export function getAllFavorites() {
    return getFavorites();
}
