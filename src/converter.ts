import { Token } from './types';

// https://www.unicode.org/charts/PDF/U1700.pdf
export const BAYBAYIN = {
	a: '\u1700',
	i: '\u1701',
	u: '\u1702',
	ka: '\u1703',
	ga: '\u1704',
	nga: '\u1705',
	ta: '\u1706',
	da: '\u1707',
	na: '\u1708',
	pa: '\u1709',
	ba: '\u170a',
	ma: '\u170b',
	ya: '\u170c',
	ra: '\u170d',
	la: '\u170e',
	wa: '\u170f',
	sa: '\u1710',
	ha: '\u1711',
	vowelSign: {
		i: '\u1712',
		u: '\u1713',
	},
	virama: {
		kudlit: '\u1714',
		pamudpod: '\u1715',
	},
	raArchaic: '\u171f',
	punctuation: {
		single: '\u1735',
		double: '\u1736',
	},
};

// convert array of tokens into characters we can write in Baybayin
function lex(tokens: Token[]) {
	return tokens
		.map((token) => {
			// TODO generalize these substitutions for syllables with initial consonants
			if (token === 'o') {
				return 'u';
			}

			if (token === 'e') {
				return 'i';
			}

			return token;
		})
		.flat();
}

export function convert(tokens: Token[]) {
	// TODO fix TS error: `'Token' can't be used to index type '{ ... }``
	return lex(tokens)
		.map((token) => BAYBAYIN[token])
		.join('');
}
