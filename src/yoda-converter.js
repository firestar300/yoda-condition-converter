/**
 * Yoda Condition Converter
 *
 * Converts standard programming conditions to Yoda conditions.
 * In Yoda conditions, the constant or literal is placed on the left side
 * of the comparison operator.
 */

/**
 * Common comparison operators to handle.
 */
const COMPARISON_OPERATORS = ['===', '!==', '==', '!=', '<=', '>=', '<', '>'];

/**
 * Logical operators for splitting compound conditions.
 */
const LOGICAL_OPERATORS = ['&&', '||'];

/**
 * Checks if a string is a literal value (string, number, boolean, null, undefined).
 *
 * @param {string} value - The value to check.
 * @returns {boolean} True if the value is a literal.
 */
const isLiteral = (value) => {
	const trimmed = value.trim();

	// String literals (single, double, or backtick quotes)
	if (/^(['"`]).*\1$/.test(trimmed)) return true;

	// Numeric literals (including negative, floats, hex, binary, octal)
	if (/^-?\d+(\.\d+)?$/.test(trimmed)) return true;
	if (/^0x[0-9a-fA-F]+$/.test(trimmed)) return true;
	if (/^0b[01]+$/.test(trimmed)) return true;
	if (/^0o[0-7]+$/.test(trimmed)) return true;

	// Boolean literals
	if (trimmed === 'true' || trimmed === 'false') return true;

	// Null and undefined
	if (trimmed === 'null' || trimmed === 'undefined') return true;

	// Constants (ALL_CAPS or SCREAMING_SNAKE_CASE)
	if (/^[A-Z][A-Z0-9_]*$/.test(trimmed)) return true;

	return false;
};

/**
 * Finds the comparison operator in a condition string.
 *
 * @param {string} condition - The condition to search.
 * @returns {object|null} Object with operator and its index, or null if not found.
 */
const findComparisonOperator = (condition) => {
	for (const operator of COMPARISON_OPERATORS) {
		const index = condition.indexOf(operator);
		if (index !== -1) {
			return { operator, index };
		}
	}
	return null;
};

/**
 * Converts a single comparison to Yoda style.
 *
 * @param {string} condition - A single comparison condition.
 * @returns {string} The Yoda-style condition.
 */
const convertSingleCondition = (condition) => {
	const operatorInfo = findComparisonOperator(condition);

	if (!operatorInfo) {
		return condition;
	}

	const { operator, index } = operatorInfo;
	const leftSide = condition.substring(0, index).trim();
	const rightSide = condition.substring(index + operator.length).trim();

	// If right side is a literal and left side is not, swap them
	if (isLiteral(rightSide) && !isLiteral(leftSide)) {
		// Handle operator reversal for < > <= >=
		let newOperator = operator;
		switch (operator) {
			case '<':
				newOperator = '>';
				break;
			case '>':
				newOperator = '<';
				break;
			case '<=':
				newOperator = '>=';
				break;
			case '>=':
				newOperator = '<=';
				break;
		}
		return `${rightSide} ${newOperator} ${leftSide}`;
	}

	// Already in Yoda style or both are literals/variables
	return condition;
};

/**
 * Splits a condition string by logical operators while preserving the operators.
 *
 * @param {string} condition - The condition to split.
 * @returns {Array} Array of parts including operators.
 */
const splitByLogicalOperators = (condition) => {
	const parts = [];
	let current = '';
	let i = 0;
	let parenDepth = 0;

	while (i < condition.length) {
		const char = condition[i];

		// Track parentheses depth
		if (char === '(') parenDepth++;
		if (char === ')') parenDepth--;

		// Only split at top level (not inside parentheses)
		if (parenDepth === 0) {
			let foundOperator = null;
			for (const op of LOGICAL_OPERATORS) {
				if (condition.substring(i, i + op.length) === op) {
					foundOperator = op;
					break;
				}
			}

			if (foundOperator) {
				if (current.trim()) {
					parts.push({ type: 'condition', value: current.trim() });
				}
				parts.push({ type: 'operator', value: foundOperator });
				current = '';
				i += foundOperator.length;
				continue;
			}
		}

		current += char;
		i++;
	}

	if (current.trim()) {
		parts.push({ type: 'condition', value: current.trim() });
	}

	return parts;
};

/**
 * Converts a condition string to Yoda style.
 *
 * @param {string} input - The condition to convert.
 * @returns {string} The Yoda-style condition.
 */
export const convertToYoda = (input) => {
	if (!input || !input.trim()) {
		return '';
	}

	const lines = input.split('\n');
	const convertedLines = lines.map((line) => {
		if (!line.trim()) return line;

		// Handle conditions wrapped in parentheses for if/while/etc.
		const conditionMatch = line.match(/^(\s*)(if|while|for|else\s*if)?\s*\((.+)\)\s*(\{?)$/);

		if (conditionMatch) {
			const [, indent, keyword, condition, brace] = conditionMatch;
			const convertedCondition = convertConditionContent(condition);
			const keywordPart = keyword ? `${keyword} ` : '';
			const bracePart = brace || '';
			return `${indent}${keywordPart}(${convertedCondition})${bracePart ? ' ' + bracePart : ''}`;
		}

		// Handle standalone condition
		return convertConditionContent(line);
	});

	return convertedLines.join('\n');
};

/**
 * Converts the content of a condition.
 *
 * @param {string} content - The condition content.
 * @returns {string} The converted condition.
 */
const convertConditionContent = (content) => {
	const parts = splitByLogicalOperators(content);

	const convertedParts = parts.map((part) => {
		if (part.type === 'operator') {
			return ` ${part.value} `;
		}

		// Handle nested parentheses
		const value = part.value;
		if (value.startsWith('(') && value.endsWith(')')) {
			const inner = value.slice(1, -1);
			return `(${convertConditionContent(inner)})`;
		}

		return convertSingleCondition(value);
	});

	return convertedParts.join('');
};

/**
 * Yoda quotes for fun messages.
 */
export const YODA_QUOTES = [
	'Converted, your condition has been. Hmmmm.',
	'Strong with the Force, this code is.',
	'Do or do not. There is no try.',
	'The path to cleaner code, Yoda conditions are.',
	'Judge me by my syntax, do you?',
	'Much to learn, you still have.',
	'Patience you must have, young coder.',
	'In a dark place we find ourselves, and a little more syntax guides us.',
	'Truly wonderful, the mind of a coder is.',
	'The greatest teacher, failure is.',
];

/**
 * Gets a random Yoda quote.
 *
 * @returns {string} A random Yoda quote.
 */
export const getRandomQuote = () => YODA_QUOTES[Math.floor(Math.random() * YODA_QUOTES.length)];
