/* ============================================================
   ANALYTICS — Event tracking placeholder
   ============================================================ */

const events = [];

export function initAnalytics() {
    // Ready for Google Analytics / Plausible / Mixpanel drop-in
    // Uncomment and configure when ready:
    //
    // <!-- Google Analytics -->
    // window.dataLayer = window.dataLayer || [];
    // function gtag(){ dataLayer.push(arguments); }
    // gtag('js', new Date());
    // gtag('config', 'G-XXXXXXXX');
}

/**
 * Track an event
 */
export function trackEvent(category, action, label = '', value = 0) {
    events.push({ category, action, label, value, timestamp: Date.now() });

    // Send to GA if available
    if (typeof gtag === 'function') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
}

/**
 * Get tracked events (for debugging)
 */
export function getEvents() {
    return [...events];
}
