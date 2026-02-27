/* ============================================================
   SHARE — Shareable links with encoded state
   ============================================================ */
import { getPreviewState } from './preview.js';
import { getSelectedFontId } from './font-browser.js';
import { showToast } from './app.js';

export function initShare() {
    const shareBtn = document.getElementById('share-btn');
    const modal = document.getElementById('share-modal');
    const closeBtn = document.getElementById('share-modal-close');
    const copyBtn = document.getElementById('copy-share-link');
    const linkInput = document.getElementById('share-link-input');

    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const url = generateShareUrl();
            if (linkInput) linkInput.value = url;
            modal?.classList.add('active');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal?.classList.remove('active');
        });
    }

    if (copyBtn && linkInput) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(linkInput.value).then(() => {
                showToast('Link copied!');
            });
        });
    }

    // Close on overlay click
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Restore from URL on load
    restoreFromUrl();
}

function generateShareUrl() {
    const state = getPreviewState();
    const text = document.getElementById('text-input')?.value || '';
    const fontId = getSelectedFontId();

    const params = new URLSearchParams({
        t: text,
        f: fontId,
        fs: state.fontSize,
        ls: state.letterSpacing,
        lh: state.lineHeight,
        tc: state.textColor,
        st: state.strokeThickness,
        sc: state.strokeColor
    });

    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

function restoreFromUrl() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('t')) return;

    const textInput = document.getElementById('text-input');
    if (params.get('t') && textInput) {
        textInput.value = params.get('t');
        textInput.dispatchEvent(new Event('input'));
    }

    // Restore other state through controls
    if (params.get('fs')) {
        const slider = document.getElementById('font-size');
        if (slider) { slider.value = params.get('fs'); slider.dispatchEvent(new Event('input')); }
    }
    if (params.get('tc')) {
        const picker = document.getElementById('text-color');
        if (picker) { picker.value = params.get('tc'); picker.dispatchEvent(new Event('input')); }
    }
}
