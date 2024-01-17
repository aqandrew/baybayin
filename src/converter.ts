import { Lexeme, Token } from './types';
import { isConsonant, isPunctuationDouble } from './utils';

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

function getBaseCharacter(token: Token) {
	if (token.substring(0, 2) === 'ng') {
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

		if (token.length > 1 && token.at(-1) !== 'a' && token !== 'ng') {
			if (token.at(-1) === 'u') {
				lexemes.push(getBaseCharacter(token));
				lexemes.push('markU');
			}

			if (token.at(-1) === 'i') {
				lexemes.push(getBaseCharacter(token));
				lexemes.push('markI');
			}

			return;
		}

		// after tokenizing, consonant only appears by itself if it's at the end of a word
		if (isConsonant(token)) {
			lexemes.push(getBaseCharacter(token));
			lexemes.push('final');
			return;
		}

		lexemes.push(token);
	});

	return lexemes;
}

export function convert(tokens: Token[]) {
	const lexemes = lex(tokens);

	// TODO fix TS error: `'Token' can't be used to index type '{ ... }``
	return lexemes
		.map((token) =>
			token === 'final'
				? BAYBAYIN.virama.kudlit
				: token === 'markU'
				? BAYBAYIN.vowelSign.u
				: token === 'markI'
				? BAYBAYIN.vowelSign.i
				: token === ','
				? BAYBAYIN.punctuation.single
				: isPunctuationDouble(token)
				? BAYBAYIN.punctuation.double
				: BAYBAYIN[token]
		)
		.join('');
}
