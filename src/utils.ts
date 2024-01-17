import {
	CONSONANTS,
	Consonant,
	PUNCTUATION_DOUBLE,
	PunctuationDouble,
	VOWELS,
	Vowel,
} from './types';

export function isVowel(character: string) {
	return VOWELS.includes(character as Vowel);
}

export function isConsonant(character: string) {
	return CONSONANTS.includes(character as Consonant);
}

export function isPunctuationDouble(character: string) {
	return PUNCTUATION_DOUBLE.includes(character as PunctuationDouble);
}
