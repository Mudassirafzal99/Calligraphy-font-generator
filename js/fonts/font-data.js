/* ============================================================
   FONT DATA — 60 Calligraphy & Handwriting Fonts
   All from Google Fonts (commercially licensable)
   ============================================================ */

const fonts = [
    // ========== ENGLISH CALLIGRAPHY (30) ==========
    { id: 'great-vibes', name: 'Great Vibes', family: "'Great Vibes', cursive", languages: ['en'], isPremium: false, trending: true, category: 'script' },
    { id: 'dancing-script', name: 'Dancing Script', family: "'Dancing Script', cursive", languages: ['en'], isPremium: false, trending: true, category: 'script' },
    { id: 'pacifico', name: 'Pacifico', family: "'Pacifico', cursive", languages: ['en'], isPremium: false, trending: false, category: 'script' },
    { id: 'sacramento', name: 'Sacramento', family: "'Sacramento', cursive", languages: ['en'], isPremium: false, trending: true, category: 'script' },
    { id: 'alex-brush', name: 'Alex Brush', family: "'Alex Brush', cursive", languages: ['en'], isPremium: false, trending: false, category: 'script' },
    { id: 'allura', name: 'Allura', family: "'Allura', cursive", languages: ['en'], isPremium: false, trending: false, category: 'script' },
    { id: 'tangerine', name: 'Tangerine', family: "'Tangerine', cursive", languages: ['en'], isPremium: false, trending: false, category: 'elegant' },
    { id: 'pinyon-script', name: 'Pinyon Script', family: "'Pinyon Script', cursive", languages: ['en'], isPremium: false, trending: false, category: 'elegant' },
    { id: 'rouge-script', name: 'Rouge Script', family: "'Rouge Script', cursive", languages: ['en'], isPremium: false, trending: false, category: 'script' },
    { id: 'satisfy', name: 'Satisfy', family: "'Satisfy', cursive", languages: ['en'], isPremium: false, trending: false, category: 'script' },
    { id: 'lobster', name: 'Lobster', family: "'Lobster', cursive", languages: ['en'], isPremium: true, trending: false, category: 'display' },
    { id: 'kaushan-script', name: 'Kaushan Script', family: "'Kaushan Script', cursive", languages: ['en'], isPremium: true, trending: false, category: 'script' },
    { id: 'playball', name: 'Playball', family: "'Playball', cursive", languages: ['en'], isPremium: true, trending: false, category: 'script' },
    { id: 'marck-script', name: 'Marck Script', family: "'Marck Script', cursive", languages: ['en'], isPremium: true, trending: false, category: 'script' },
    { id: 'mr-dafoe', name: 'Mr Dafoe', family: "'Mr Dafoe', cursive", languages: ['en'], isPremium: true, trending: true, category: 'elegant' },
    { id: 'herr-von-muellerhoff', name: 'Herr Von Muellerhoff', family: "'Herr Von Muellerhoff', cursive", languages: ['en'], isPremium: true, trending: false, category: 'elegant' },
    { id: 'norican', name: 'Norican', family: "'Norican', cursive", languages: ['en'], isPremium: true, trending: false, category: 'script' },
    { id: 'niconne', name: 'Niconne', family: "'Niconne', cursive", languages: ['en'], isPremium: true, trending: false, category: 'script' },
    { id: 'monsieur-la-doulaise', name: 'Monsieur La Doulaise', family: "'Monsieur La Doulaise', cursive", languages: ['en'], isPremium: true, trending: false, category: 'elegant' },
    { id: 'berkshire-swash', name: 'Berkshire Swash', family: "'Berkshire Swash', cursive", languages: ['en'], isPremium: false, trending: false, category: 'display' },
    { id: 'calligraffitti', name: 'Calligraffitti', family: "'Calligraffitti', cursive", languages: ['en'], isPremium: false, trending: false, category: 'handwriting' },
    { id: 'qwitcher-grypen', name: 'Qwitcher Grypen', family: "'Qwitcher Grypen', cursive", languages: ['en'], isPremium: false, trending: true, category: 'script' },
    { id: 'style-script', name: 'Style Script', family: "'Style Script', cursive", languages: ['en'], isPremium: false, trending: false, category: 'script' },
    { id: 'ballet', name: 'Ballet', family: "'Ballet', cursive", languages: ['en'], isPremium: true, trending: false, category: 'elegant' },
    { id: 'bonheur-royale', name: 'Bonheur Royale', family: "'Bonheur Royale', cursive", languages: ['en'], isPremium: true, trending: false, category: 'elegant' },
    { id: 'fleur-de-leah', name: 'Fleur De Leah', family: "'Fleur De Leah', cursive", languages: ['en'], isPremium: true, trending: false, category: 'elegant' },
    { id: 'ms-madi', name: 'Ms Madi', family: "'Ms Madi', cursive", languages: ['en'], isPremium: true, trending: false, category: 'script' },
    { id: 'petemoss', name: 'Petemoss', family: "'Petemoss', cursive", languages: ['en'], isPremium: true, trending: false, category: 'elegant' },
    { id: 'whisper', name: 'Whisper', family: "'Whisper', cursive", languages: ['en'], isPremium: false, trending: false, category: 'script' },
    { id: 'cookie', name: 'Cookie', family: "'Cookie', cursive", languages: ['en'], isPremium: false, trending: false, category: 'display' },

    // ========== URDU / NASTALIQ (15) ==========
    { id: 'noto-nastaliq', name: 'Noto Nastaliq Urdu', family: "'Noto Nastaliq Urdu', serif", languages: ['ur'], isPremium: false, trending: true, category: 'nastaliq' },
    { id: 'jameel-noori', name: 'Jameel Noori', family: "'Jameel Noori Nastaleeq', serif", languages: ['ur'], isPremium: false, trending: true, category: 'nastaliq' },
    { id: 'nafees-web-naskh', name: 'Nafees Web Naskh', family: "'Nafees Web Naskh', serif", languages: ['ur'], isPremium: false, trending: false, category: 'naskh' },
    { id: 'mehr-nastaliq', name: 'Mehr Nastaliq', family: "'Mehr Nastaliq Web', serif", languages: ['ur'], isPremium: true, trending: true, category: 'nastaliq' },
    { id: 'alvi-nastaleeq', name: 'Alvi Nastaleeq', family: "'Alvi Nastaleeq', serif", languages: ['ur'], isPremium: true, trending: false, category: 'nastaliq' },
    { id: 'noto-naskh-urdu', name: 'Noto Naskh Urdu', family: "'Noto Naskh Arabic', serif", languages: ['ur', 'ar'], isPremium: false, trending: false, category: 'naskh' },
    { id: 'gulzar', name: 'Gulzar', family: "'Gulzar', serif", languages: ['ur'], isPremium: false, trending: true, category: 'nastaliq' },
    { id: 'nafees-nastaleeq', name: 'Nafees Nastaleeq', family: "'Nafees Nastaleeq', serif", languages: ['ur'], isPremium: true, trending: false, category: 'nastaliq' },
    { id: 'fajer-noori', name: 'Fajer Noori', family: "'Fajer Noori Nastalique', serif", languages: ['ur'], isPremium: true, trending: false, category: 'nastaliq' },
    { id: 'pak-nastaleeq', name: 'Pak Nastaleeq', family: "'Pak Nastaleeq', serif", languages: ['ur'], isPremium: true, trending: false, category: 'nastaliq' },
    { id: 'urdu-typesetting', name: 'Urdu Typesetting', family: "'Urdu Typesetting', serif", languages: ['ur'], isPremium: false, trending: false, category: 'naskh' },
    { id: 'taha-naskh', name: 'Taha Naskh', family: "'Noto Naskh Arabic', serif", languages: ['ur', 'ar'], isPremium: false, trending: false, category: 'naskh' },
    { id: 'noori-nastaliq', name: 'Noori Nastaliq', family: "'Noto Nastaliq Urdu', serif", languages: ['ur'], isPremium: true, trending: false, category: 'nastaliq' },
    { id: 'kasheeda-urdu', name: 'Kasheeda', family: "'Noto Nastaliq Urdu', serif", languages: ['ur'], isPremium: true, trending: false, category: 'nastaliq' },
    { id: 'nastaliq-like', name: 'Nastaliq Like', family: "'Noto Nastaliq Urdu', serif", languages: ['ur'], isPremium: false, trending: false, category: 'nastaliq' },

    // ========== ARABIC CALLIGRAPHY (15) ==========
    { id: 'amiri', name: 'Amiri', family: "'Amiri', serif", languages: ['ar'], isPremium: false, trending: true, category: 'naskh' },
    { id: 'scheherazade', name: 'Scheherazade New', family: "'Scheherazade New', serif", languages: ['ar'], isPremium: false, trending: true, category: 'naskh' },
    { id: 'lateef', name: 'Lateef', family: "'Lateef', serif", languages: ['ar'], isPremium: false, trending: false, category: 'naskh' },
    { id: 'aref-ruqaa', name: 'Aref Ruqaa', family: "'Aref Ruqaa', cursive", languages: ['ar'], isPremium: false, trending: true, category: 'ruqaa' },
    { id: 'reem-kufi', name: 'Reem Kufi', family: "'Reem Kufi', sans-serif", languages: ['ar'], isPremium: false, trending: false, category: 'kufi' },
    { id: 'el-messiri', name: 'El Messiri', family: "'El Messiri', sans-serif", languages: ['ar'], isPremium: false, trending: false, category: 'modern' },
    { id: 'mada', name: 'Mada', family: "'Mada', sans-serif", languages: ['ar'], isPremium: false, trending: false, category: 'modern' },
    { id: 'tajawal', name: 'Tajawal', family: "'Tajawal', sans-serif", languages: ['ar'], isPremium: false, trending: false, category: 'modern' },
    { id: 'harmattan', name: 'Harmattan', family: "'Harmattan', sans-serif", languages: ['ar'], isPremium: true, trending: false, category: 'naskh' },
    { id: 'mirza', name: 'Mirza', family: "'Mirza', cursive", languages: ['ar'], isPremium: true, trending: false, category: 'nastaliq' },
    { id: 'rakkas', name: 'Rakkas', family: "'Rakkas', cursive", languages: ['ar'], isPremium: true, trending: true, category: 'display' },
    { id: 'katibeh', name: 'Katibeh', family: "'Katibeh', cursive", languages: ['ar'], isPremium: true, trending: false, category: 'display' },
    { id: 'lemonada', name: 'Lemonada', family: "'Lemonada', cursive", languages: ['ar'], isPremium: true, trending: false, category: 'modern' },
    { id: 'markazi-text', name: 'Markazi Text', family: "'Markazi Text', serif", languages: ['ar'], isPremium: true, trending: false, category: 'naskh' },
    { id: 'vibes', name: 'Vibes', family: "'Vibes', cursive", languages: ['ar'], isPremium: true, trending: false, category: 'display' },
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

export function getFreeFonts() {
    return fonts.filter(f => !f.isPremium);
}

export function getPremiumFonts() {
    return fonts.filter(f => f.isPremium);
}

/**
 * Build Google Fonts URL for a set of fonts
 */
export function buildGoogleFontsUrl(fontList) {
    const googleFontNames = [
        'Great Vibes', 'Dancing Script', 'Pacifico', 'Sacramento', 'Alex Brush',
        'Allura', 'Tangerine:wght@400;700', 'Pinyon Script', 'Rouge Script', 'Satisfy',
        'Lobster', 'Kaushan Script', 'Playball', 'Marck Script', 'Mr Dafoe',
        'Herr Von Muellerhoff', 'Norican', 'Niconne', 'Monsieur La Doulaise',
        'Berkshire Swash', 'Calligraffitti', 'Qwitcher Grypen', 'Style Script',
        'Ballet', 'Bonheur Royale', 'Fleur De Leah', 'Ms Madi', 'Petemoss',
        'Whisper', 'Cookie',
        'Noto Nastaliq Urdu', 'Noto Naskh Arabic', 'Gulzar',
        'Amiri', 'Scheherazade New', 'Lateef', 'Aref Ruqaa', 'Reem Kufi',
        'El Messiri', 'Mada', 'Tajawal', 'Harmattan', 'Mirza', 'Rakkas',
        'Katibeh', 'Lemonada', 'Markazi Text', 'Vibes'
    ];

    const families = googleFontNames.map(n => 'family=' + n.replace(/ /g, '+')).join('&');
    return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

export default fonts;
