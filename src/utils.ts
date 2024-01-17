import {
	CONSONANTS,
	Consonant,
	PUNCTUATION_DOUBLE,
	PunctuationDouble,
	Token,
	VOWELS,
	Vowel,
} from './types';

export function isVowel(Token: Token) {
	return VOWELS.includes(Token as Vowel);
}

export function isConsonant(token: Token) {
	return CONSONANTS.includes(token as Consonant);
}

export function isPunctuationDouble(character: string) {
	return PUNCTUATION_DOUBLE.includes(character as PunctuationDouble);
}
