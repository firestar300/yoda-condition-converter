import './style.css';
import { convertToYoda, getRandomQuote } from './yoda-converter.js';

/**
 * Renders the main application.
 */
const renderApp = () => {
	const app = document.querySelector('#app');

	app.innerHTML = `
		<div class="min-h-screen bg-gradient-to-b from-dark-side via-swamp to-dark-side relative overflow-hidden">
			<!-- Animated background stars -->
			<div class="absolute inset-0 overflow-hidden pointer-events-none">
				${generateStars(50)}
			</div>

			<!-- Main container -->
			<div class="relative z-10 container mx-auto px-4 py-8 md:py-12">
				<!-- Header -->
				<header class="text-center mb-8 md:mb-12">
					<div class="animate-float inline-block">
						<span class="text-6xl md:text-8xl">🐸</span>
					</div>
					<h1 class="font-display text-3xl md:text-5xl font-black mt-4 tracking-wider text-force-glow drop-shadow-[0_0_10px_rgba(124,252,0,0.5)]">
						Yoda Condition Converter
					</h1>
					<p class="mt-4 text-lg md:text-xl text-yoda-green/80 font-body">
						Transform your conditions, you must.
					</p>
				</header>

				<!-- Converter Section -->
				<main class="max-w-5xl mx-auto">
					<div class="grid md:grid-cols-2 gap-6 md:gap-8">
						<!-- Input Section -->
						<div class="relative group">
							<label
								for="input-condition"
								class="block font-display text-sm uppercase tracking-widest mb-3 text-yoda-dark"
							>
								<span class="inline-block mr-2">⚡</span>
								Your Condition
							</label>
							<div class="relative">
								<textarea
									id="input-condition"
									class="w-full h-48 md:h-64 p-4 bg-swamp/50 border-2 border-yoda-dark rounded-lg font-body text-lightsaber placeholder:text-yoda-dark/50 focus:outline-none focus:border-force-glow focus:ring-2 focus:ring-force-glow/30 transition-all duration-300 resize-none"
									placeholder="if (value === 42) {&#10;  // Your code&#10;}"
									spellcheck="false"
								></textarea>
								<div class="absolute inset-0 rounded-lg bg-gradient-to-r from-force-glow/0 via-force-glow/5 to-force-glow/0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							</div>
						</div>

						<!-- Output Section -->
						<div class="relative">
							<label
								for="output-condition"
								class="block font-display text-sm uppercase tracking-widest mb-3 text-yoda-dark"
							>
								<span class="inline-block mr-2">✨</span>
								Yoda Condition
							</label>
							<div class="relative">
								<textarea
									id="output-condition"
									class="w-full h-48 md:h-64 p-4 bg-dark-side/80 border-2 border-yoda-green rounded-lg font-body text-force-glow placeholder:text-yoda-dark/50 resize-none animate-pulse-border"
									placeholder="Converted, your condition will be..."
									readonly
									spellcheck="false"
								></textarea>
								<button
									id="copy-btn"
									class="absolute top-3 right-3 p-2 bg-yoda-dark/50 hover:bg-yoda-dark rounded-md transition-all duration-200 hover:scale-110 active:scale-95 group/copy"
									title="Copy to clipboard"
								>
									<svg class="w-5 h-5 text-yoda-green group-hover/copy:text-force-glow transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
									</svg>
								</button>
							</div>
						</div>
					</div>

					<!-- Quote Section -->
					<div class="mt-8 text-center">
						<blockquote
							id="yoda-quote"
							class="inline-block px-6 py-4 bg-swamp/30 border-l-4 border-force-glow rounded-r-lg italic text-yoda-green/90 font-body"
						>
							"Enter your condition, you should. Transform it, I will."
						</blockquote>
					</div>

					<!-- Examples Section -->
					<section class="mt-12 md:mt-16">
						<h2 class="font-display text-xl md:text-2xl text-center mb-6 text-yoda-green">
							<span class="inline-block mr-2">📚</span>
							Examples, here are
						</h2>
						<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
							${generateExamples()}
						</div>
					</section>
				</main>

				<!-- Footer -->
				<footer class="mt-16 text-center text-yoda-dark/60 text-sm">
					<p>With the Force, made this was. May your conditions be Yoda-fied. 🌟</p>
				</footer>
			</div>

			<!-- Toast notification -->
			<div id="toast" class="fixed bottom-4 right-4 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none">
				<div class="bg-yoda-dark border border-force-glow rounded-lg px-4 py-3 flex items-center gap-2 shadow-lg shadow-force-glow/20">
					<svg class="w-5 h-5 text-force-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					<span class="text-force-glow font-body">Copied to clipboard, it has been!</span>
				</div>
			</div>
		</div>
	`;

	initializeEventListeners();
};

/**
 * Generates random star elements for background.
 *
 * @param {number} count - Number of stars to generate.
 * @returns {string} HTML string of star elements.
 */
const generateStars = (count) => {
	let stars = '';
	for (let i = 0; i < count; i++) {
		const x = Math.random() * 100;
		const y = Math.random() * 100;
		const size = Math.random() * 2 + 1;
		const delay = Math.random() * 3;
		const duration = Math.random() * 2 + 2;
		stars += `
			<div
				class="absolute rounded-full bg-force-glow/40"
				style="left: ${x}%; top: ${y}%; width: ${size}px; height: ${size}px; animation: glow ${duration}s ${delay}s ease-in-out infinite;"
			></div>
		`;
	}
	return stars;
};

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
 * Generates example cards HTML.
 *
 * @returns {string} HTML string of example cards.
 */
const generateExamples = () =>
	EXAMPLES.map(
		(example) => `
		<button
			class="example-btn text-left p-4 bg-swamp/30 border border-yoda-dark/50 rounded-lg hover:border-yoda-green hover:bg-swamp/50 transition-all duration-200 group"
			data-example="${example.input.replace(/"/g, '&quot;')}"
		>
			<span class="text-xs uppercase tracking-wide text-yoda-dark group-hover:text-yoda-green transition-colors">${example.desc}</span>
			<code class="block mt-2 text-sm text-lightsaber/80 font-body truncate">${escapeHtml(example.input)}</code>
		</button>
	`
	).join('');

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
 * Initializes all event listeners.
 */
const initializeEventListeners = () => {
	const inputEl = document.getElementById('input-condition');
	const outputEl = document.getElementById('output-condition');
	const quoteEl = document.getElementById('yoda-quote');
	const copyBtn = document.getElementById('copy-btn');
	const toast = document.getElementById('toast');

	// Convert on input
	inputEl.addEventListener('input', () => {
		const converted = convertToYoda(inputEl.value);
		outputEl.value = converted;

		if (converted && converted !== inputEl.value) {
			quoteEl.textContent = `"${getRandomQuote()}"`;
		}
	});

	// Copy to clipboard
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

// Initialize the app
renderApp();
