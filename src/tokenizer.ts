import { CONSONANTS, Consonant, Token, VOWELS, Vowel } from './types';

function isVowel(character: string) {
	return VOWELS.includes(character as Vowel);
}

function isConsonant(character: string) {
	return CONSONANTS.includes(character as Consonant);
}

export function tokenize(inputString: string) {
	const tokens: Token[] = [];
	const inputArray = [...inputString.toLowerCase()];
	let index = 0;

	while (index < inputArray.length) {
		let value = inputArray[index] as Token;
		const nextIndex = index + 1;

		if (nextIndex !== inputArray.length) {
			const nextCharacter = inputArray[nextIndex];
			const valueWillBecomeNG = value === 'n' && nextCharacter === 'g';

			if (isConsonant(value)) {
				if (isVowel(nextCharacter) || valueWillBecomeNG) {
					value += nextCharacter;

					if (valueWillBecomeNG) {
						const nextNextIndex = nextIndex + 1;

						if (nextNextIndex !== inputArray.length) {
							const nextNextCharacter = inputArray[nextNextIndex];

							if (isVowel(nextNextCharacter)) {
								value += nextNextCharacter;
							}
						}
					}
				}
			}
		}

		tokens.push(value as Token);
		index += value.length;
	}

	return tokens;
}
