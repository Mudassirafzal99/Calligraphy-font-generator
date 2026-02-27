/* ============================================================
   FONT BROWSER — Grid display, filtering, lazy rendering
   ============================================================ */
import { getAllFonts, getFontsByLanguage } from './fonts/font-data.js';
import { setPreviewFont } from './preview.js';
import { isFavorite, toggleFavorite } from './favorites.js';
import { isPremiumUser } from './premium.js';

let currentFilter = 'all';
let selectedFontId = 'great-vibes';

export function initFontBrowser() {
    renderFontGrid();
    bindFilters();
}

export function getSelectedFontId() {
    return selectedFontId;
}

function bindFilters() {
    const container = document.getElementById('font-filters');
    if (!container) return;

    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        currentFilter = btn.dataset.filter;
        container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderFontGrid();
    });
}

function renderFontGrid() {
    const grid = document.getElementById('font-grid');
    if (!grid) return;

    let fonts;
    if (currentFilter === 'favorites') {
        fonts = getAllFonts().filter(f => isFavorite(f.id));
    } else {
        fonts = getFontsByLanguage(currentFilter);
    }

    grid.innerHTML = '';

    fonts.forEach((font, i) => {
        const card = document.createElement('div');
        card.className = `font-card anim-slide-up stagger-${(i % 8) + 1}`;
        if (font.id === selectedFontId) card.classList.add('selected');
        card.dataset.fontId = font.id;

        const favActive = isFavorite(font.id) ? 'active' : '';
        const premiumBadge = font.isPremium && !isPremiumUser()
            ? `<span class="badge badge--premium">PRO</span>`
            : '';
        const lockIcon = font.isPremium && !isPremiumUser()
            ? `<div class="font-card__lock"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="8" rx="2" stroke="#d4af37" stroke-width="1.2"/><path d="M5 7V5a3 3 0 016 0v2" stroke="#d4af37" stroke-width="1.2" fill="none"/></svg></div>`
            : '';
        const trendBadge = font.trending
            ? `<span class="badge badge--trending">🔥 Trending</span>`
            : '';

        // Preview text based on language
        let sampleText = 'Royal Calligraphy';
        if (font.languages.includes('ur')) sampleText = 'شاہی خطاطی';
        else if (font.languages.includes('ar')) sampleText = 'خطاطة ملكية';

        card.innerHTML = `
      ${lockIcon}
      <div class="font-card__name">
        <span>${font.name}</span>
        ${trendBadge}
        ${premiumBadge}
      </div>
      <div class="font-card__preview" style="font-family: ${font.family}">
        ${sampleText}
      </div>
      <div class="font-card__actions">
        <button class="font-card__fav ${favActive}" data-font-id="${font.id}" aria-label="Toggle favorite">
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 12.5s-5.5-3.5-5.5-7A3 3 0 017 3a3 3 0 015.5 2.5c0 3.5-5.5 7-5.5 7z" stroke="currentColor" stroke-width="1.2" fill="${favActive ? 'currentColor' : 'none'}"/></svg>
        </button>
        <span class="font-card__badge">${font.languages.map(l => l.toUpperCase()).join(' · ')}</span>
      </div>
    `;

        // Click card to select font
        card.addEventListener('click', (e) => {
            if (e.target.closest('.font-card__fav')) return;

            if (font.isPremium && !isPremiumUser()) {
                document.getElementById('premium-modal')?.classList.add('active');
                return;
            }

            selectedFontId = font.id;
            setPreviewFont(font.family);
            grid.querySelectorAll('.font-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            // Scroll to preview
            document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
        });

        // Favorite toggle
        card.querySelector('.font-card__fav')?.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(font.id);
            renderFontGrid();
        });

        grid.appendChild(card);
    });
}

/**
 * Re-render the grid (called externally when favorites change, etc.)
 */
export function refreshFontGrid() {
    renderFontGrid();
}
