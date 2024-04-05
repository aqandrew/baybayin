export const VOWELS = ['a', 'e', 'i', 'o', 'u'] as const;
export type Vowel = (typeof VOWELS)[number];

export const CONSONANTS = [
	'k',
	'g',
	'ng',
	't',
	'd',
	'r',
	'n',
	'p',
	'b',
	'm',
	'y',
	'l',
	'w',
	's',
	'h',
] as const;
export type Consonant = (typeof CONSONANTS)[number];

export type ConsonantThenVowel = `${Consonant}${Vowel}`;

type PunctuationSingle = ',';

export const PUNCTUATION_DOUBLE = ['.', '!', '?'] as const;
export type PunctuationDouble = (typeof PUNCTUATION_DOUBLE)[number];

export type Token =
	| Vowel
	| Consonant
	| ConsonantThenVowel
	| PunctuationSingle
	| PunctuationDouble;

export type Lexeme = Token | 'final' | 'markU' | 'markI' | ' ';
