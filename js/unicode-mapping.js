/* ============================================================
   UNICODE MAPPING — Convert standard text to Unicode styles
   ============================================================ */

/**
 * Maps standard ASCII characters to equivalent Unicode blocks.
 * Usage: convertToUnicode("Hello", "script")
 */

const unicodeMaps = {
    // 𝒢𝓇𝑒𝒶𝓉 𝒱𝒾𝒷𝑒𝓈 (Mathematical Script)
    script: {
        baseStart: 0x0041, // 'A'
        baseEnd: 0x007A,   // 'z'
        offsetUpper: 0x1D49C - 0x0041,
        offsetLower: 0x1D4B6 - 0x0061,
        exceptions: {
            'B': 0x212C, 'E': 0x2130, 'F': 0x2131, 'H': 0x210B, 'I': 0x2110,
            'L': 0x2112, 'M': 0x2133, 'R': 0x211B, 'e': 0x212F, 'g': 0x210A, 'o': 0x2134
        }
    },
    // 𝕯𝖆𝖓𝖈𝖎𝖓𝖌 𝕾𝖈𝖗𝖎𝖕𝖙 (Mathematical Fraktur)
    fraktur: {
        baseStart: 0x0041,
        baseEnd: 0x007A,
        offsetUpper: 0x1D504 - 0x0041,
        offsetLower: 0x1D51E - 0x0061,
        exceptions: {
            'C': 0x212D, 'H': 0x210C, 'I': 0x2111, 'R': 0x211C, 'Z': 0x2128
        }
    },
    // 𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜 (e.g. for display fonts)
    doubleStruck: {
        baseStart: 0x0041,
        baseEnd: 0x007A,
        offsetUpper: 0x1D538 - 0x0041,
        offsetLower: 0x1D552 - 0x0061,
        exceptions: {
            'C': 0x2102, 'H': 0x210D, 'N': 0x2115, 'P': 0x2119, 'Q': 0x211A, 'R': 0x211D, 'Z': 0x2124
        }
    },
    // 𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄
    boldItalic: {
        baseStart: 0x0041,
        baseEnd: 0x007A,
        offsetUpper: 0x1D468 - 0x0041,
        offsetLower: 0x1D482 - 0x0061,
        exceptions: {}
    }
};

/**
 * Determines which Unicode set to use based on the selected font
 */
function getStyleForFont(fontId) {
    const scriptFonts = ['great-vibes', 'alex-brush', 'allura', 'qwitcher-grypen', 'tangerine', 'pinyon-script', 'whisper'];
    const frakturFonts = ['dancing-script', 'lobster', 'cookie'];
    const boldItalicFonts = ['pacifico', 'satisfy', 'calligraffitti'];
    const displayFonts = ['sacramento', 'rouge-script', 'berkshire-swash', 'style-script'];

    if (scriptFonts.includes(fontId)) return 'script';
    if (frakturFonts.includes(fontId)) return 'fraktur';
    if (boldItalicFonts.includes(fontId)) return 'boldItalic';
    if (displayFonts.includes(fontId)) return 'doubleStruck';

    return null; // Don't map by default
}

export function convertToUnicode(text, fontId) {
    const style = getStyleForFont(fontId);
    if (!style) return text; // Return original text if no mapping applies

    const map = unicodeMaps[style];
    let result = '';

    for (let char of text) {
        const code = char.charCodeAt(0);

        // Handle Exceptions
        if (map.exceptions && map.exceptions[char]) {
            result += String.fromCodePoint(map.exceptions[char]);
            continue;
        }

        // Apply Offsets
        if (code >= 0x0041 && code <= 0x005A) { // Uppercase
            result += String.fromCodePoint(code + map.offsetUpper);
        } else if (code >= 0x0061 && code <= 0x007A) { // Lowercase
            result += String.fromCodePoint(code + map.offsetLower);
        } else {
            result += char; // Keep space, numbers, punctuation unchanged
        }
    }

    return result;
}
