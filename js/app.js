/* ============================================================
   APP.JS — Main entry point
   Royal Calligraphy Font Generator
   ============================================================ */
import { initI18n, setLanguage } from './i18n/i18n.js';
import { loadAllFonts } from './fonts/font-loader.js';
import { getTrendingFonts, getAllFonts } from './fonts/font-data.js';
import { initPreview, setPreviewText, setPreviewFont } from './preview.js';
import { initControls } from './controls.js';
import { initFontBrowser } from './font-browser.js';
import { initFontSelector } from './font-selector.js';
import { initComparison, updateComparisonText } from './comparison.js';
import { initPresets } from './presets.js';
import { initShare } from './share.js';
import { initPremium, isPremiumUser } from './premium.js';
import { initAds } from './ads.js';
import { initAnalytics, trackEvent } from './analytics.js';
import { exportImage, copyText } from './export.js';
import { isFavorite, toggleFavorite } from './favorites.js';

/* ---- Toast utility (exported for other modules) ---- */
let toastTimer;
export function showToast(message) {
    const toast = document.getElementById('toast');
    const text = document.getElementById('toast-text');
    if (!toast || !text) return;
    text.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ---- Initialize everything ---- */
document.addEventListener('DOMContentLoaded', () => {
    // 1. i18n first (sets RTL/LTR)
    initI18n();

    // 2. Load fonts
    loadAllFonts();

    // 3. Init modules
    initPreview();
    initControls();
    initFontBrowser();
    initFontSelector();
    initComparison();
    initPresets();
    initPremium();
    initAds();
    initAnalytics();

    // 4. Setup event listeners
    setupTextInput();
    setupLangSwitcher();
    setupMobileMenu();
    setupExportActions();
    renderTrendingFonts();

    // 5. Init share (reads URL params)
    initShare();

    // 6. Track page view
    trackEvent('page', 'view', 'home');
});

/* ---- Text input → live preview ---- */
function setupTextInput() {
    const textInput = document.getElementById('text-input');
    if (!textInput) return;

    textInput.addEventListener('input', () => {
        setPreviewText(textInput.value);
        updateComparisonText(textInput.value);
        trackEvent('editor', 'type');
    });
}

/* ---- Language Switcher ---- */
function setupLangSwitcher() {
    const btn = document.getElementById('lang-btn');
    const dropdown = document.getElementById('lang-dropdown');
    if (!btn || !dropdown) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });

    dropdown.querySelectorAll('.lang-switcher__option').forEach(option => {
        option.addEventListener('click', () => {
            setLanguage(option.dataset.lang);
            dropdown.classList.remove('open');
            trackEvent('language', 'switch', option.dataset.lang);

            // Update textarea placeholder direction
            const textInput = document.getElementById('text-input');
            if (textInput) {
                textInput.style.direction = option.dataset.lang === 'en' ? 'ltr' : 'rtl';
            }
        });
    });

    // Close on outside click
    document.addEventListener('click', () => {
        dropdown.classList.remove('open');
    });
}

/* ---- Mobile Menu ---- */
function setupMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('header-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        toggle.classList.toggle('active');
    });

    // Close menu on link click
    nav.querySelectorAll('.header__link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.classList.remove('active');
        });
    });
}

/* ---- Export Actions ---- */
function setupExportActions() {
    const downloadBtn = document.getElementById('download-btn');
    const exportDropdown = document.getElementById('export-dropdown');
    const copyBtn = document.getElementById('copy-btn');

    // Toggle export dropdown
    if (downloadBtn && exportDropdown) {
        downloadBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            exportDropdown.classList.toggle('open');
        });

        document.addEventListener('click', () => {
            exportDropdown.classList.remove('open');
        });

        exportDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Export format buttons
    document.querySelectorAll('.export-option[data-format]').forEach(btn => {
        btn.addEventListener('click', () => {
            const format = btn.dataset.format;
            const transparent = document.getElementById('transparent-bg')?.checked || false;
            const hd = document.getElementById('hd-export')?.checked || false;
            exportImage(format, transparent, hd);
            exportDropdown?.classList.remove('open');
            trackEvent('export', format);
        });
    });

    // Copy button
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            copyText();
            trackEvent('action', 'copy');
        });
    }
}

/* ---- Trending Fonts Grid ---- */
function renderTrendingFonts() {
    const grid = document.getElementById('trending-grid');
    if (!grid) return;

    const trending = getTrendingFonts();
    grid.innerHTML = '';

    trending.forEach((font, i) => {
        const card = document.createElement('div');
        card.className = `font-card anim-slide-up stagger-${(i % 8) + 1}`;
        card.dataset.fontId = font.id;

        const favActive = isFavorite(font.id) ? 'active' : '';
        const premiumBadge = font.isPremium && !isPremiumUser()
            ? `<span class="badge badge--premium">PRO</span>`
            : '';

        let sampleText = 'Royal Calligraphy';
        if (font.languages.includes('ur')) sampleText = 'شاہی خطاطی';
        else if (font.languages.includes('ar')) sampleText = 'خطاطة ملكية';

        card.innerHTML = `
      <div class="font-card__name">
        <span>${font.name}</span>
        <span class="badge badge--trending">🔥 Trending</span>
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

        card.addEventListener('click', (e) => {
            if (e.target.closest('.font-card__fav')) return;
            if (font.isPremium && !isPremiumUser()) {
                document.getElementById('premium-modal')?.classList.add('active');
                return;
            }
            setPreviewFont(font.family);
            document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
            trackEvent('font', 'select_trending', font.name);
        });

        card.querySelector('.font-card__fav')?.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(font.id);
            renderTrendingFonts();
        });

        grid.appendChild(card);
    });
}
