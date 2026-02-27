/* ============================================================
   CONTROLS — Customization sliders & color pickers
   ============================================================ */
import { setPreviewState } from './preview.js';

export function initControls() {
    // Collapsible toggle
    const panel = document.getElementById('controls-panel');
    const toggle = document.getElementById('controls-toggle');
    if (toggle && panel) {
        toggle.addEventListener('click', () => {
            panel.classList.toggle('open');
        });
    }

    // Font size
    bindSlider('font-size', 'font-size-val', (v) => {
        setPreviewState('fontSize', parseFloat(v));
        return v + 'px';
    });

    // Stroke thickness
    bindSlider('stroke-thickness', 'stroke-val', (v) => {
        setPreviewState('strokeThickness', parseFloat(v));
        return v + 'px';
    });

    // Letter spacing
    bindSlider('letter-spacing', 'spacing-val', (v) => {
        setPreviewState('letterSpacing', parseFloat(v));
        return v + 'px';
    });

    // Line height
    bindSlider('line-height', 'line-height-val', (v) => {
        setPreviewState('lineHeight', parseFloat(v));
        return v;
    });

    // Text color
    bindColor('text-color', 'color-val', (v) => {
        setPreviewState('textColor', v);
    });

    // Stroke color
    bindColor('stroke-color', 'stroke-color-val', (v) => {
        setPreviewState('strokeColor', v);
    });
}

function bindSlider(sliderId, valId, onChange) {
    const slider = document.getElementById(sliderId);
    const valEl = document.getElementById(valId);
    if (!slider || !valEl) return;

    slider.addEventListener('input', () => {
        valEl.textContent = onChange(slider.value);
    });
}

function bindColor(pickerId, valId, onChange) {
    const picker = document.getElementById(pickerId);
    const valEl = document.getElementById(valId);
    if (!picker || !valEl) return;

    picker.addEventListener('input', () => {
        valEl.textContent = picker.value;
        onChange(picker.value);
    });
}
