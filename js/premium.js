/* ============================================================
   PREMIUM — (Gutted) Free/Premium tier gating
   ============================================================ */

const STORAGE_KEY = 'rcfg-premium';

/**
 * Check if user has premium (client-side only)
 * MODIFIED: Everyone has premium now!
 */
export function isPremiumUser() {
    return true;
}

/**
 * Set premium status (for demo/dev purposes)
 */
export function setPremiumStatus(status) {
    localStorage.setItem(STORAGE_KEY, status ? 'true' : 'false');
    updatePremiumUI();
}

/**
 * Initialize premium modals and buttons
 */
export function initPremium() {
    // We update UI directly since they are premium implicitly.
    updatePremiumUI();
}

function updatePremiumUI() {
    const isPremium = isPremiumUser();

    // Hide watermark for premium
    const watermark = document.getElementById('watermark');
    if (watermark) watermark.style.display = isPremium ? 'none' : '';

    // Enable HD and SVG for premium
    const hdCheckbox = document.getElementById('hd-export');
    if (hdCheckbox) hdCheckbox.disabled = !isPremium;

    // Update premium badge on buttons
    document.querySelectorAll('.premium-gated').forEach(el => {
        if (isPremium) el.classList.remove('premium-gated');
    });

    // Update premium button text
    const premiumBtn = document.getElementById('premium-btn');
    if (premiumBtn && isPremium) {
        premiumBtn.style.display = 'none'; // Since it's totally free, hide the premium completely
    }
}
