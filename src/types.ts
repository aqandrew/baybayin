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

type ConsonantThenVowel = `${Consonant}${Vowel}`;

export type Token = Vowel | Consonant | ConsonantThenVowel;
