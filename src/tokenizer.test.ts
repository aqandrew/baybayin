import { describe, expect, test } from 'vitest';
import { tokenize } from './tokenizer';

describe('tokenizer', () => {
	test('empty input', () => {
		const tokens = tokenize('');
		expect(tokens.length).toEqual(0);
	});

	test.skip('invalid input');

	describe('single word', () => {
		describe('monosyllabic', () => {
			test('lone vowel', () => {
				const tokens = tokenize('o');
				expect(tokens).toEqual(['o']);
			});

			test('A vowel', () => {
				const tokens = tokenize('ba');
				expect(tokens).toEqual(['ba']);
			});

			test('O vowel', () => {
				const tokens = tokenize('mo');
				expect(tokens).toEqual(['mo']);
			});

			test.skip('U vowel');

			test('I vowel', () => {
				const tokens = tokenize('si');
				expect(tokens).toEqual(['si']);
			});

			test('E vowel', () => {
				const tokens = tokenize('ke');
				expect(tokens).toEqual(['ke']);
			});

			test('initial vowel + final consonant', () => {
				const tokens = tokenize('ay');
				expect(tokens).toEqual(['a', 'y']);
			});

			test('initial consnant + final consonant', () => {
				const tokens = tokenize('daw');
				expect(tokens).toEqual(['da', 'w']);
			});

			test('initial digraph', () => {
				const tokens = tokenize('nga');
				expect(tokens).toEqual(['nga']);
			});

			test('initial digraph x2', () => {
				const tokens = tokenize('nganga');
				expect(tokens).toEqual(['nga', 'nga']);
			});

			test('initial vowel + final digraph', () => {
				const tokens = tokenize('ang');
				expect(tokens).toEqual(['a', 'ng']);
			});

			test('initial consonant + final digraph', () => {
				const tokens = tokenize('lang');
				expect(tokens).toEqual(['la', 'ng']);
			});

			test('ng', () => {
				const tokens = tokenize('ng');
				expect(tokens).toEqual(['na', 'ng']);
			});

			test.skip('mga', () => {
				const tokens = tokenize('mga');
				expect(tokens).toEqual(['ma', 'nga']);
			});
		});

		describe('multisyllabic', () => {
			test('vowels only', () => {
				const tokens = tokenize('oo');
				expect(tokens).toEqual(['o', 'o']);
			});

			test('syllables with A vowels only', () => {
				const tokens = tokenize('talaga');
				expect(tokens).toEqual(['ta', 'la', 'ga']);
			});

			test('initial consonant syllable followed by initial vowel syllable', () => {
				const tokens = tokenize('laruin');
				expect(tokens).toEqual(['la', 'ru', 'i', 'n']);
			});
		});
	});

	describe.skip('multiple words');

	test.skip('single punctuation');

	test.skip('double punctuation');
});
