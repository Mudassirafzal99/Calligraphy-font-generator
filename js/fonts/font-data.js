/* ============================================================
   FONT DATA — 60 Calligraphy & Handwriting Fonts (NOW FREE ONLY)
   Google Fonts (source: 'google') load automatically.
   Local fonts (source: 'local') need .woff2/.woff files installed
   on the user's device — they are shown but may fall back to serif.
   ============================================================ */

const fonts = [
    // ========== ENGLISH CALLIGRAPHY ==========
    { id: 'great-vibes', name: 'Great Vibes', family: "'Great Vibes', cursive", languages: ['en'], trending: true, category: 'script', source: 'google' },
    { id: 'dancing-script', name: 'Dancing Script', family: "'Dancing Script', cursive", languages: ['en'], trending: true, category: 'script', source: 'google' },
    { id: 'pacifico', name: 'Pacifico', family: "'Pacifico', cursive", languages: ['en'], trending: false, category: 'script', source: 'google' },
    { id: 'sacramento', name: 'Sacramento', family: "'Sacramento', cursive", languages: ['en'], trending: true, category: 'script', source: 'google' },
    { id: 'alex-brush', name: 'Alex Brush', family: "'Alex Brush', cursive", languages: ['en'], trending: false, category: 'script', source: 'google' },
    { id: 'allura', name: 'Allura', family: "'Allura', cursive", languages: ['en'], trending: false, category: 'script', source: 'google' },
    { id: 'lobster', name: 'Lobster', family: "'Lobster', cursive", languages: ['en'], trending: true, category: 'script', source: 'google' },
    { id: 'tangerine', name: 'Tangerine', family: "'Tangerine', cursive", languages: ['en'], trending: false, category: 'elegant', source: 'google' },
    { id: 'pinyon-script', name: 'Pinyon Script', family: "'Pinyon Script', cursive", languages: ['en'], trending: false, category: 'elegant', source: 'google' },
    { id: 'rouge-script', name: 'Rouge Script', family: "'Rouge Script', cursive", languages: ['en'], trending: false, category: 'script', source: 'google' },
    { id: 'satisfy', name: 'Satisfy', family: "'Satisfy', cursive", languages: ['en'], trending: false, category: 'script', source: 'google' },
    { id: 'berkshire-swash', name: 'Berkshire Swash', family: "'Berkshire Swash', cursive", languages: ['en'], trending: false, category: 'display', source: 'google' },
    { id: 'calligraffitti', name: 'Calligraffitti', family: "'Calligraffitti', cursive", languages: ['en'], trending: false, category: 'handwriting', source: 'google' },
    { id: 'qwitcher-grypen', name: 'Qwitcher Grypen', family: "'Qwitcher Grypen', cursive", languages: ['en'], trending: true, category: 'script', source: 'google' },
    { id: 'style-script', name: 'Style Script', family: "'Style Script', cursive", languages: ['en'], trending: false, category: 'script', source: 'google' },
    { id: 'whisper', name: 'Whisper', family: "'Whisper', cursive", languages: ['en'], trending: false, category: 'script', source: 'google' },
    { id: 'cookie', name: 'Cookie', family: "'Cookie', cursive", languages: ['en'], trending: false, category: 'display', source: 'google' },

    // ========== URDU / NASTALIQ ==========
    { id: 'noto-nastaliq', name: 'Noto Nastaliq Urdu', family: "'Noto Nastaliq Urdu', serif", languages: ['ur'], trending: true, category: 'nastaliq', source: 'google' },
    { id: 'noto-naskh-urdu', name: 'Noto Naskh Urdu', family: "'Noto Naskh Arabic', serif", languages: ['ur', 'ar'], trending: false, category: 'naskh', source: 'google' },
    { id: 'gulzar', name: 'Gulzar', family: "'Gulzar', serif", languages: ['ur'], trending: true, category: 'nastaliq', source: 'google' },
    { id: 'jameel-noori', name: 'Jameel Noori', family: "'Jameel Noori Nastaleeq', serif", languages: ['ur'], trending: true, category: 'nastaliq', source: 'local' },
    { id: 'nafees-web-naskh', name: 'Nafees Web Naskh', family: "'Nafees Web Naskh', serif", languages: ['ur'], trending: false, category: 'naskh', source: 'local' },
    { id: 'urdu-typesetting', name: 'Urdu Typesetting', family: "'Urdu Typesetting', serif", languages: ['ur'], trending: false, category: 'naskh', source: 'local' },
    { id: 'taha-naskh', name: 'Taha Naskh', family: "'Noto Naskh Arabic', serif", languages: ['ur', 'ar'], trending: false, category: 'naskh', source: 'google' },
    { id: 'nastaliq-like', name: 'Nastaliq Like', family: "'Noto Nastaliq Urdu', serif", languages: ['ur'], trending: false, category: 'nastaliq', source: 'google' },

    // ========== ARABIC CALLIGRAPHY ==========
    { id: 'amiri', name: 'Amiri', family: "'Amiri', serif", languages: ['ar'], trending: true, category: 'naskh', source: 'google' },
    { id: 'scheherazade', name: 'Scheherazade New', family: "'Scheherazade New', serif", languages: ['ar'], trending: true, category: 'naskh', source: 'google' },
    { id: 'lateef', name: 'Lateef', family: "'Lateef', serif", languages: ['ar'], trending: false, category: 'naskh', source: 'google' },
    { id: 'aref-ruqaa', name: 'Aref Ruqaa', family: "'Aref Ruqaa', cursive", languages: ['ar'], trending: true, category: 'ruqaa', source: 'google' },
    { id: 'reem-kufi', name: 'Reem Kufi', family: "'Reem Kufi', sans-serif", languages: ['ar'], trending: false, category: 'kufi', source: 'google' },
    { id: 'el-messiri', name: 'El Messiri', family: "'El Messiri', sans-serif", languages: ['ar'], trending: false, category: 'modern', source: 'google' },
    { id: 'mada', name: 'Mada', family: "'Mada', sans-serif", languages: ['ar'], trending: false, category: 'modern', source: 'google' },
    { id: 'tajawal', name: 'Tajawal', family: "'Tajawal', sans-serif", languages: ['ar'], trending: false, category: 'modern', source: 'google' }
];

export function getAllFonts() {
    return fonts;
}

export function getFontById(id) {
    return fonts.find(f => f.id === id);
}

export function getFontsByLanguage(lang) {
    if (lang === 'all') return fonts;
    return fonts.filter(f => f.languages.includes(lang));
}

export function getTrendingFonts() {
    return fonts.filter(f => f.trending);
}

/** Get only fonts that can be loaded from Google Fonts */
export function getGoogleFonts() {
    return fonts.filter(f => f.source === 'google');
}

/**
 * Build Google Fonts URLs for all loadable fonts.
 * Returns TWO URLs to avoid exceeding browser URL-length limits:
 *   [0] = English calligraphy fonts
 *   [1] = Arabic + Urdu fonts (Noto, Amiri, etc.)
 */
export function buildGoogleFontsUrls() {
    /* ---- English calligraphy fonts (all on Google Fonts) ---- */
    const englishFontNames = [
        'Great Vibes', 'Dancing Script', 'Pacifico', 'Sacramento', 'Alex Brush',
        'Allura', 'Lobster', 'Tangerine:wght@400;700', 'Pinyon Script', 'Rouge Script', 'Satisfy',
        'Berkshire Swash', 'Calligraffitti', 'Qwitcher Grypen', 'Style Script',
        'Whisper', 'Cookie'
    ];

    /* ---- Arabic + Urdu fonts available on Google Fonts ---- */
    const arabicUrduFontNames = [
        'Noto Nastaliq Urdu', 'Noto Naskh Arabic', 'Gulzar',
        'Amiri', 'Scheherazade New', 'Lateef', 'Aref Ruqaa', 'Reem Kufi',
        'El Messiri', 'Mada', 'Tajawal',
        'Noto Sans Arabic'  // Used as RTL UI body font
    ];

    const toUrl = (names) => {
        const families = names.map(n => 'family=' + n.replace(/ /g, '+')).join('&');
        return `https://fonts.googleapis.com/css2?${families}&display=swap`;
    };

    return [toUrl(englishFontNames), toUrl(arabicUrduFontNames)];
}

/* Keep backward compat — returns first URL only */
export function buildGoogleFontsUrl() {
    return buildGoogleFontsUrls()[0];
}

export default fonts;

