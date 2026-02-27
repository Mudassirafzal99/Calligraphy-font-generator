/* ============================================================
   i18n Engine — Language switching, RTL, DOM translation
   ============================================================ */
import en from './en.js';
import ur from './ur.js';
import ar from './ar.js';

const languages = { en, ur, ar };
let currentLang = 'en';

/**
 * Get a nested value from an object using dot notation
 */
function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * Apply translations to all elements with data-i18n attribute
 */
function translateDOM() {
    const lang = languages[currentLang];
    if (!lang) return;

    // Translate text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getNestedValue(lang, key);
        if (value) el.innerHTML = value;
    });

    // Translate attributes (e.g., placeholder)
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        const pairs = el.getAttribute('data-i18n-attr').split(',');
        pairs.forEach(pair => {
            const [attr, key] = pair.trim().split(':');
            const value = getNestedValue(lang, key);
            if (value && attr) el.setAttribute(attr, value);
        });
    });

    // Set document direction and lang
    document.documentElement.lang = lang.code;
    document.documentElement.dir = lang.dir;
}

/**
 * Set the language and update the DOM
 */
export function setLanguage(langCode) {
    if (!languages[langCode]) return;
    currentLang = langCode;
    localStorage.setItem('rcfg-lang', langCode);
    translateDOM();

    // Update the language switcher UI
    const currentEl = document.getElementById('lang-current');
    if (currentEl) currentEl.textContent = langCode.toUpperCase();

    document.querySelectorAll('.lang-switcher__option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === langCode);
    });
}

/**
 * Get current language code
 */
export function getCurrentLang() {
    return currentLang;
}

/**
 * Get a translation string
 */
export function t(key) {
    return getNestedValue(languages[currentLang], key) || key;
}

/**
 * Initialize i18n
 */
export function initI18n() {
    const saved = localStorage.getItem('rcfg-lang');
    const initial = saved && languages[saved] ? saved : 'en';
    setLanguage(initial);
}
