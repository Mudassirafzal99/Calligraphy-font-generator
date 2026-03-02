import { getAllFonts } from './fonts/font-data.js';
import { setPreviewFont, getPreviewState } from './preview.js';
import { getSelectedFontId } from './font-browser.js';

export function initFontSelector() {
    const wrap = document.getElementById('font-selector-wrap');
    const selector = document.getElementById('font-selector');
    const searchInput = document.getElementById('font-search');
    const dropdownList = document.getElementById('font-dropdown-list');

    if (!selector || !searchInput || !dropdownList) return;

    let fonts = getAllFonts();
    let filteredFonts = [...fonts];
    let activeIndex = -1;
    let originalFontFamily = '';
    let originalFontName = '';

    // Temporarily apply font to preview without finalizing selection
    function temporaryApplyFont(font) {
        setPreviewFont(font.family);
        const textInput = document.getElementById('text-input');
        if (textInput) {
            textInput.style.fontFamily = font.family;
        }
    }

    // Helper to render the list
    function renderList() {
        dropdownList.innerHTML = '';
        filteredFonts.forEach((font, index) => {
            const item = document.createElement('div');
            item.className = 'font-selector__item';
            if (index === activeIndex) {
                item.classList.add('active');
            }

            // Display text based on available language
            let defaultSample = 'Royal Calligraphy';
            if (font.languages.includes('ur')) defaultSample = 'شاہی خطاطی';
            else if (font.languages.includes('ar')) defaultSample = 'خطاطة ملكية';

            const textInput = document.getElementById('text-input');
            const customText = textInput ? textInput.value : '';
            const displayText = customText || defaultSample;

            item.innerHTML = `
        <span style="font-family: ${font.family}" data-sample="${defaultSample}">${displayText}</span>
        <span class="font-selector__item-name">${font.name}</span>
      `;

            // Hover preview (temporarily applies)
            item.addEventListener('mouseenter', () => {
                const prevActive = dropdownList.children[activeIndex];
                if (prevActive) prevActive.classList.remove('active');

                activeIndex = index;
                item.classList.add('active');

                temporaryApplyFont(font);
            });

            item.addEventListener('click', () => {
                selectFont(font);
                closeDropdown();
            });

            // Prevent closing when clicking item directly
            item.addEventListener('mousedown', (e) => e.preventDefault());

            dropdownList.appendChild(item);
        });

        scrollActiveIntoView();
    }

    function scrollActiveIntoView() {
        if (activeIndex >= 0 && activeIndex < dropdownList.children.length) {
            const activeEl = dropdownList.children[activeIndex];
            activeEl.scrollIntoView({ block: 'nearest' });
        }
    }

    function openDropdown() {
        selector.classList.add('open');
        // Save state before exploring dropdown
        const state = getPreviewState();
        originalFontFamily = state.fontFamily;
        originalFontName = searchInput.value;
        searchInput.select(); // Highlight text instead of clearing
        renderList();
    }

    function closeDropdown() {
        selector.classList.remove('open');
    }

    function revertFont() {
        setPreviewFont(originalFontFamily);
        const textInput = document.getElementById('text-input');
        if (textInput) {
            textInput.style.fontFamily = originalFontFamily;
        }
        searchInput.value = originalFontName;
    }

    function selectFont(font) {
        originalFontFamily = font.family;
        originalFontName = font.name;
        temporaryApplyFont(font);
        searchInput.value = font.name;
    }

    // Toggle logic
    searchInput.addEventListener('focus', () => {
        filteredFonts = [...fonts];
        activeIndex = filteredFonts.findIndex(f => f.name === searchInput.value);
        if (activeIndex === -1) activeIndex = 0;
        openDropdown();
    });

    searchInput.addEventListener('blur', () => {
        if (selector.classList.contains('open')) {
            revertFont();
            closeDropdown();
        }
    });

    // Search filter
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        filteredFonts = fonts.filter(font => font.name.toLowerCase().includes(query));
        activeIndex = filteredFonts.length > 0 ? 0 : -1;
        renderList();

        if (filteredFonts.length > 0) {
            temporaryApplyFont(filteredFonts[0]);
        } else {
            revertFont();
        }

        if (!selector.classList.contains('open')) {
            selector.classList.add('open');
        }
    });

    // Helper to highlight arrows
    function updateArrowHighlight(key) {
        const upArrow = wrap.querySelector('.font-arrow-up');
        const downArrow = wrap.querySelector('.font-arrow-down');
        if (!upArrow || !downArrow) return;

        upArrow.style.color = key === 'ArrowUp' ? 'var(--clr-gold)' : '';
        downArrow.style.color = key === 'ArrowDown' ? 'var(--clr-gold)' : '';
        setTimeout(() => {
            upArrow.style.color = '';
            downArrow.style.color = '';
        }, 150);
    }

    // Arrow keys navigation + Live Preview
    searchInput.addEventListener('keydown', (e) => {
        if (!selector.classList.contains('open') && e.key !== 'Escape') {
            if (e.key === 'ArrowDown' || e.key === 'Enter') {
                e.preventDefault();
                searchInput.focus();
                // If it's closed and they press down, just open it
                openDropdown();
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const prevActive = dropdownList.children[activeIndex];
            if (prevActive) prevActive.classList.remove('active');

            activeIndex = (activeIndex + 1) % filteredFonts.length;

            const newActive = dropdownList.children[activeIndex];
            if (newActive) newActive.classList.add('active');

            scrollActiveIntoView();

            if (filteredFonts[activeIndex]) {
                temporaryApplyFont(filteredFonts[activeIndex]);
            }
            updateArrowHighlight('ArrowDown');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevActive = dropdownList.children[activeIndex];
            if (prevActive) prevActive.classList.remove('active');

            activeIndex = (activeIndex - 1 + filteredFonts.length) % filteredFonts.length;

            const newActive = dropdownList.children[activeIndex];
            if (newActive) newActive.classList.add('active');

            scrollActiveIntoView();

            if (filteredFonts[activeIndex]) {
                temporaryApplyFont(filteredFonts[activeIndex]);
            }
            updateArrowHighlight('ArrowUp');
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0 && activeIndex < filteredFonts.length) {
                // User requirement: Enter should act as selection copy/application
                selectFont(filteredFonts[activeIndex]);
                closeDropdown();
                searchInput.blur();
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            revertFont();
            closeDropdown();
            searchInput.blur();
        }
    });
}
