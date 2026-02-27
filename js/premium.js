/* ============================================================
   PREMIUM — Free/Premium tier gating
   ============================================================ */

const STORAGE_KEY = 'rcfg-premium';

/**
 * Check if user has premium (client-side only)
 */
export function isPremiumUser() {
    return localStorage.getItem(STORAGE_KEY) === 'true';
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
    const premiumBtn = document.getElementById('premium-btn');
    const upgradeBtn = document.getElementById('upgrade-btn');
    const modal = document.getElementById('premium-modal');
    const closeBtn = document.getElementById('modal-close');

    // Open premium modal
    [premiumBtn, upgradeBtn].forEach(btn => {
        btn?.addEventListener('click', () => {
            modal?.classList.add('active');
        });
    });

    // Close modal
    closeBtn?.addEventListener('click', () => {
        modal?.classList.remove('active');
    });

    // Close on overlay click
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Subscribe buttons (placeholder)
    modal?.querySelectorAll('.pricing-card .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // In production, this would redirect to Stripe/PayPal checkout
            alert('Payment integration coming soon! For demo, premium is now activated.');
            setPremiumStatus(true);
            modal?.classList.remove('active');
            window.location.reload();
        });
    });

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
        premiumBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l2.1 4.3 4.9.7-3.5 3.4.8 4.6L8 11.8 3.7 14l.8-4.6L1 6l4.9-.7L8 1z" fill="currentColor"/></svg> PRO`;
    }
}
