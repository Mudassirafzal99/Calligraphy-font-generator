/* ============================================================
   PREVIEW — Live text rendering with customization
   ============================================================ */

const state = {
    fontFamily: "'Great Vibes', cursive",
    fontSize: 48,
    letterSpacing: 0,
    lineHeight: 1.4,
    textColor: '#d4af37',
    strokeThickness: 0,
    strokeColor: '#0b1d33'
};

let previewEl = null;

export function initPreview() {
    previewEl = document.getElementById('preview-text');
    updatePreview();
}

export function setPreviewFont(family) {
    state.fontFamily = family;
    updatePreview();
}

export function setPreviewState(key, value) {
    if (key in state) {
        state[key] = value;
        updatePreview();
    }
}

export function getPreviewState() {
    return { ...state };
}

function updatePreview() {
    if (!previewEl) return;

    previewEl.style.fontFamily = state.fontFamily;
    previewEl.style.fontSize = state.fontSize + 'px';
    previewEl.style.letterSpacing = state.letterSpacing + 'px';
    previewEl.style.lineHeight = state.lineHeight;
    previewEl.style.color = state.textColor;

    // Apply font to textarea as well
    const textInput = document.getElementById('text-input');
    if (textInput) {
        textInput.style.fontFamily = state.fontFamily;
    }

    if (state.strokeThickness > 0) {
        previewEl.style.webkitTextStroke = `${state.strokeThickness}px ${state.strokeColor}`;
        previewEl.style.textStroke = `${state.strokeThickness}px ${state.strokeColor}`;
    } else {
        previewEl.style.webkitTextStroke = 'unset';
        previewEl.style.textStroke = 'unset';
    }
}

export function setPreviewText(text) {
    if (!previewEl) return;
    previewEl.textContent = text || 'Your beautiful calligraphy will appear here';
}
