/* ============================================================
   COMPARISON — Side-by-side font comparison
   ============================================================ */
import { getAllFonts } from './fonts/font-data.js';
import { getPreviewState } from './preview.js';

export function initComparison() {
    const fonts = getAllFonts();

    for (let i = 1; i <= 3; i++) {
        const select = document.getElementById(`compare-select-${i}`);
        const preview = document.getElementById(`compare-preview-${i}`);
        if (!select || !preview) continue;

        // Populate options
        fonts.forEach(font => {
            const option = document.createElement('option');
            option.value = font.id;
            option.textContent = font.name;
            option.dataset.family = font.family;
            select.appendChild(option);
        });

        select.addEventListener('change', () => {
            const selected = select.options[select.selectedIndex];
            if (!selected.value) {
                preview.textContent = 'Select a font to preview';
                preview.style.fontFamily = '';
                return;
            }

            const family = selected.dataset.family;
            const textInput = document.getElementById('text-input');
            const text = textInput?.value || 'Royal Calligraphy';
            const state = getPreviewState();

            preview.textContent = text;
            preview.style.fontFamily = family;
            preview.style.fontSize = Math.min(state.fontSize, 36) + 'px';
            preview.style.color = state.textColor;
            preview.style.lineHeight = state.lineHeight;
        });
    }
}

/**
 * Update comparison previews when text changes
 */
export function updateComparisonText(text) {
    for (let i = 1; i <= 3; i++) {
        const select = document.getElementById(`compare-select-${i}`);
        const preview = document.getElementById(`compare-preview-${i}`);
        if (!select || !preview || !select.value) continue;
        preview.textContent = text || 'Royal Calligraphy';
    }
}
