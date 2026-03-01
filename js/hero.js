document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('hero-textarea');
    const counter = document.getElementById('hero-counter');
    const resultsContainer = document.getElementById('hero-results');

    if (!textarea || !counter || !resultsContainer) return;

    const MAX_CHARS = 200;
    const defaultText = 'Beautiful Calligraphy';

    const fontOptions = [
        { fontFamily: '"Playfair Display", serif', fontSize: '1.35rem' },
        { fontFamily: '"Dancing Script", cursive', fontSize: '1.5rem' },
        { fontFamily: '"Aref Ruqaa", serif', fontSize: '1.4rem' },
        { fontFamily: '"Great Vibes", cursive', fontSize: '1.6rem' },
        { fontFamily: 'sans-serif', fontStyle: 'italic', fontSize: '1.25rem' }
    ];

    function updateCounter() {
        counter.textContent = `Characters: ${textarea.value.length} / ${MAX_CHARS}`;
    }

    function renderResults() {
        const textToRender = textarea.value.trim() || defaultText;
        resultsContainer.innerHTML = '';

        fontOptions.forEach(styleProps => {
            const card = document.createElement('div');
            card.className = 'hero-result-card';

            const textElement = document.createElement('div');
            textElement.className = 'hero-result-text';
            textElement.textContent = textToRender;
            Object.assign(textElement.style, styleProps);

            const copyBtn = document.createElement('button');
            copyBtn.className = 'hero-copy-btn';
            copyBtn.innerHTML = '📋 Copy';

            copyBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(textToRender);
                    copyBtn.innerHTML = 'Copied ✅';
                    copyBtn.classList.add('copied');

                    setTimeout(() => {
                        copyBtn.innerHTML = '📋 Copy';
                        copyBtn.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Copy failed:', err);
                }
            });

            card.appendChild(textElement);
            card.appendChild(copyBtn);
            resultsContainer.appendChild(card);
        });
    }

    textarea.addEventListener('input', () => {
        updateCounter();
        renderResults();
    });

    updateCounter();
    renderResults();
});
