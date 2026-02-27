/* ============================================================
   EXPORT — PNG, JPG, SVG export with watermark/HD gating
   ============================================================ */
import { getPreviewState } from './preview.js';
import { isPremiumUser } from './premium.js';
import { showToast } from './app.js';

/**
 * Export the preview as an image
 */
export function exportImage(format = 'png', transparent = false, hd = false) {
    const previewEl = document.getElementById('preview-text');
    const canvas = document.getElementById('export-canvas');
    if (!previewEl || !canvas) return;

    const text = previewEl.textContent;
    if (!text || text === 'Your beautiful calligraphy will appear here') {
        showToast('Please enter some text first.');
        return;
    }

    // Gating
    if (format === 'svg' && !isPremiumUser()) {
        showPremiumModal();
        return;
    }
    if (hd && !isPremiumUser()) {
        showPremiumModal();
        return;
    }

    if (format === 'svg') {
        exportSVG(text);
        return;
    }

    const state = getPreviewState();
    const scale = hd ? 3 : 2;
    const padding = 60 * scale;

    // Measure text
    const ctx = canvas.getContext('2d');
    const fontStr = `${state.fontSize * scale}px ${state.fontFamily}`;
    ctx.font = fontStr;

    const lines = text.split('\n');
    const lineHeight = state.fontSize * state.lineHeight * scale;
    let maxWidth = 0;
    lines.forEach(line => {
        const m = ctx.measureText(line);
        if (m.width > maxWidth) maxWidth = m.width;
    });

    canvas.width = maxWidth + padding * 2;
    canvas.height = lines.length * lineHeight + padding * 2;

    // Background
    if (!transparent) {
        ctx.fillStyle = '#0b1d33';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Text
    ctx.font = fontStr;
    ctx.fillStyle = state.textColor;
    ctx.textBaseline = 'top';
    ctx.letterSpacing = (state.letterSpacing * scale) + 'px';

    if (state.strokeThickness > 0) {
        ctx.strokeStyle = state.strokeColor;
        ctx.lineWidth = state.strokeThickness * scale;
    }

    lines.forEach((line, i) => {
        const x = padding;
        const y = padding + i * lineHeight;
        if (state.strokeThickness > 0) ctx.strokeText(line, x, y);
        ctx.fillText(line, x, y);
    });

    // Watermark for free users
    if (!isPremiumUser()) {
        ctx.save();
        ctx.globalAlpha = 0.12;
        ctx.font = `bold ${28 * scale}px ${state.fontFamily}`;
        ctx.fillStyle = '#d4af37';
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-0.25);
        ctx.textAlign = 'center';
        ctx.fillText('ROYAL CALLIGRAPHY', 0, 0);
        ctx.restore();
    }

    // Download
    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const quality = format === 'jpg' ? 0.92 : undefined;
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `calligraphy.${format}`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Downloaded!');
    }, mimeType, quality);
}

/**
 * Export as SVG
 */
function exportSVG(text) {
    const state = getPreviewState();
    const lines = text.split('\n');
    const lineH = state.fontSize * state.lineHeight;
    const width = 800;
    const height = lines.length * lineH + 120;

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
    svg += `<rect width="100%" height="100%" fill="#0b1d33"/>`;

    lines.forEach((line, i) => {
        const y = 60 + (i + 1) * lineH;
        let attrs = `x="60" y="${y}" font-family="${state.fontFamily}" font-size="${state.fontSize}" fill="${state.textColor}" letter-spacing="${state.letterSpacing}"`;
        if (state.strokeThickness > 0) {
            attrs += ` stroke="${state.strokeColor}" stroke-width="${state.strokeThickness}"`;
        }
        svg += `<text ${attrs}>${escapeXml(line)}</text>`;
    });

    svg += `</svg>`;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calligraphy.svg';
    a.click();
    URL.revokeObjectURL(url);
    showToast('SVG Downloaded!');
}

function escapeXml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showPremiumModal() {
    document.getElementById('premium-modal')?.classList.add('active');
}

/**
 * Copy preview text to clipboard
 */
export function copyText() {
    const previewEl = document.getElementById('preview-text');
    if (!previewEl) return;
    navigator.clipboard.writeText(previewEl.textContent).then(() => {
        showToast('Copied to clipboard!');
    });
}
