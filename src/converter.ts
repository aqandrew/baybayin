import { ConsonantThenVowel, Lexeme, Token } from './types';
import { isConsonant } from './utils';

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

const BASE_MONOGRAPH_CHARACTERS = Object.keys(BAYBAYIN).filter(
	(key) => key.length === 2
);

function getBaseCharacter(token: ConsonantThenVowel) {
	const lengthOfConsonant = [...token].toSpliced(token.length - 1).length;

	if (lengthOfConsonant === 2) {
		return 'nga';
	}

	return BASE_MONOGRAPH_CHARACTERS.find(
		(character) => character[0] === token[0]
	);
}

// convert array of tokens into characters we can write in Baybayin
function lex(tokens: Token[]) {
	const lexemes: Lexeme[] = [];

	tokens.forEach((token) => {
		token = token.replace('o', 'u').replace('e', 'i') as Token;

		// after tokenizing, consonant only appears by itself if it's at the end of a word
		if (isConsonant(token)) {
			lexemes.push(getBaseCharacter(token));
			lexemes.push('final');
		}

		lexemes.push(token);
	});

	return lexemes;
}

export function convert(tokens: Token[]) {
	// TODO fix TS error: `'Token' can't be used to index type '{ ... }``
	return lex(tokens)
		.map((token) =>
			token === 'final' ? BAYBAYIN.virama.kudlit : BAYBAYIN[token]
		)
		.join('');
}
