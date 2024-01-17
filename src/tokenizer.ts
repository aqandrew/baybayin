import { Token } from './types';
import { isConsonant, isVowel } from './utils';

export function tokenize(inputString: string) {
	const tokens: Token[] = [];
	const inputStringSanitized = inputString.toLowerCase();
	const inputArray = [...inputStringSanitized];
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

	// 'ng' is pronounced 'nang'
	if (inputStringSanitized === 'ng') {
		tokens.unshift('na');
	}

	// 'mga' is pronounced 'manga'
	if (inputStringSanitized === 'mga') {
		tokens[0] = 'ma';
		tokens[1] = 'nga';
	}

	return tokens;
}
