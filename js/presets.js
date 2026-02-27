/* ============================================================
   PRESETS — Quick text templates
   ============================================================ */
import { getCurrentLang } from './i18n/i18n.js';

const presets = {
    en: {
        names: ['Muhammad Ali', 'Fatima Zahra', 'Hassan Khan', 'Aisha Ahmed', 'Omar Farooq'],
        quotes: [
            'In the name of God, the Most Gracious, the Most Merciful',
            'The pen is mightier than the sword',
            'Art is the signature of civilizations',
            'Where words fail, calligraphy speaks',
            'Beauty lies in the strokes of the pen'
        ],
        wedding: [
            'Together Forever',
            'Mr. & Mrs. Khan',
            'Save the Date',
            'Happily Ever After',
            'With Love & Blessings'
        ]
    },
    ur: {
        names: ['محمد علی', 'فاطمہ زہرا', 'حسن خان', 'عائشہ احمد', 'عمر فاروق'],
        quotes: [
            'بسم اللہ الرحمن الرحیم',
            'علم حاصل کرو چاہے چین جانا پڑے',
            'خطاطی وہ فن ہے جو دل کی زبان بولتا ہے',
            'قلم کی طاقت تلوار سے زیادہ ہے',
            'صبر کا پھل میٹھا ہوتا ہے'
        ],
        wedding: [
            'شادی مبارک ہو',
            'نکاح نامہ',
            'خوشی کا دن',
            'دو دلوں کا ملاپ',
            'مبارک باد'
        ]
    },
    ar: {
        names: ['محمد علي', 'فاطمة الزهراء', 'حسن خان', 'عائشة أحمد', 'عمر فاروق'],
        quotes: [
            'بسم الله الرحمن الرحيم',
            'اطلبوا العلم ولو في الصين',
            'الخط الحسن يزيد الحق وضوحا',
            'القلم أقوى من السيف',
            'الصبر مفتاح الفرج'
        ],
        wedding: [
            'زفاف سعيد',
            'عقد القران',
            'بارك الله لكما',
            'معاً إلى الأبد',
            'مبروك الزواج'
        ]
    }
};

export function initPresets() {
    const buttons = document.querySelectorAll('.preset-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.preset;
            applyPreset(type);
        });
    });
}

function applyPreset(type) {
    const lang = getCurrentLang();
    const langPresets = presets[lang] || presets.en;
    const items = langPresets[type];
    if (!items) return;

    const random = items[Math.floor(Math.random() * items.length)];
    const textInput = document.getElementById('text-input');
    if (textInput) {
        textInput.value = random;
        textInput.dispatchEvent(new Event('input'));
    }
}
