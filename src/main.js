import './style.css';
import { convertToYoda, getRandomQuote } from './yoda-converter.js';

/**
 * Example conditions to demonstrate the converter.
 */
const EXAMPLES = [
	{ input: 'value === 42', desc: 'Simple equality' },
	{ input: 'name == "Yoda"', desc: 'String comparison' },
	{ input: 'count > 0 && status === true', desc: 'Compound condition' },
	{ input: 'if (age >= 18) {', desc: 'If statement' },
	{ input: 'type !== null && value === undefined', desc: 'Null checks' },
	{ input: 'ERROR_CODE === code', desc: 'Already Yoda!' },
];

/**
 * Generates random star elements for background.
 *
 * @param {number} count - Number of stars to generate.
 */
const generateStars = (count) => {
	const container = document.getElementById('stars-container');
	if (!container) return;

	const fragment = document.createDocumentFragment();

	for (let i = 0; i < count; i++) {
		const star = document.createElement('div');
		star.className = 'absolute rounded-full bg-force-glow/40';
		star.style.cssText = `
			left: ${Math.random() * 100}%;
			top: ${Math.random() * 100}%;
			width: ${Math.random() * 2 + 1}px;
			height: ${Math.random() * 2 + 1}px;
			animation: glow ${Math.random() * 2 + 2}s ${Math.random() * 3}s ease-in-out infinite;
		`;
		fragment.appendChild(star);
	}

	container.appendChild(fragment);
};

/**
 * Escapes HTML special characters.
 *
 * @param {string} text - Text to escape.
 * @returns {string} Escaped text.
 */
const escapeHtml = (text) =>
	text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');

/**
 * Generates example cards and inserts them into the DOM.
 */
const generateExamples = () => {
	const container = document.getElementById('examples-grid');
	if (!container) return;

	const fragment = document.createDocumentFragment();

	EXAMPLES.forEach((example) => {
		const button = document.createElement('button');
		button.type = 'button';
		button.className =
			'example-btn text-left p-4 bg-swamp/30 border border-yoda-dark/50 rounded-lg hover:border-yoda-green hover:bg-swamp/50 transition-all duration-200 group';
		button.dataset.example = example.input;
		button.innerHTML = `
			<span class="text-xs uppercase tracking-wide text-yoda-dark group-hover:text-yoda-green transition-colors">${example.desc}</span>
			<code class="block mt-2 text-sm text-lightsaber/80 font-body truncate">${escapeHtml(example.input)}</code>
		`;
		fragment.appendChild(button);
	});

	container.appendChild(fragment);
};

/**
 * Shows the toast notification.
 *
 * @param {HTMLElement} toast - The toast element.
 */
const showToast = (toast) => {
	toast.classList.remove('translate-y-20', 'opacity-0');
	toast.classList.add('translate-y-0', 'opacity-100');

	setTimeout(() => {
		toast.classList.add('translate-y-20', 'opacity-0');
		toast.classList.remove('translate-y-0', 'opacity-100');
	}, 2000);
};

/**
 * Initializes all event listeners.
 */
const initializeEventListeners = () => {
	const inputEl = document.getElementById('input-condition');
	const outputEl = document.getElementById('output-condition');
	const quoteEl = document.getElementById('yoda-quote');
	const copyBtn = document.getElementById('copy-btn');
	const toast = document.getElementById('toast');

	if (!inputEl || !outputEl) return;

	// Convert on input
	inputEl.addEventListener('input', () => {
		const converted = convertToYoda(inputEl.value);
		outputEl.value = converted;

		if (converted && converted !== inputEl.value && quoteEl) {
			quoteEl.textContent = `"${getRandomQuote()}"`;
		}
	});

	// Copy to clipboard
	if (copyBtn && toast) {
		copyBtn.addEventListener('click', async () => {
			const text = outputEl.value;
			if (!text) return;

			try {
				await navigator.clipboard.writeText(text);
				showToast(toast);
			} catch (err) {
				console.error('Failed to copy:', err);
			}
		});
	}

	// Example buttons
	document.querySelectorAll('.example-btn').forEach((btn) => {
		btn.addEventListener('click', () => {
			const example = btn.dataset.example;
			inputEl.value = example;
			inputEl.dispatchEvent(new Event('input'));

			// Scroll to converter on mobile
			inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
	});
};

/**
 * Initializes the application.
 */
const initApp = () => {
	generateStars(50);
	generateExamples();
	initializeEventListeners();
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initApp);
} else {
	initApp();
}
