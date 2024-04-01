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
			test('lone vowel (o)', () => {
				const tokens = tokenize('o');
				expect(tokens).toEqual(['o']);
			});

			test('A vowel (ba)', () => {
				const tokens = tokenize('ba');
				expect(tokens).toEqual(['ba']);
			});

			test('O vowel (mo)', () => {
				const tokens = tokenize('mo');
				expect(tokens).toEqual(['mo']);
			});

			test('U vowel (uy)', () => {
				const tokens = tokenize('uy');
				expect(tokens).toEqual(['u', 'y']);
			});

			test('I vowel (si)', () => {
				const tokens = tokenize('si');
				expect(tokens).toEqual(['si']);
			});

			test('E vowel (ke)', () => {
				const tokens = tokenize('ke');
				expect(tokens).toEqual(['ke']);
			});

			test('initial vowel + final consonant (ay)', () => {
				const tokens = tokenize('ay');
				expect(tokens).toEqual(['a', 'y']);
			});

			test('initial consnant + final consonant (daw)', () => {
				const tokens = tokenize('daw');
				expect(tokens).toEqual(['da', 'w']);
			});

			test('initial digraph (nga)', () => {
				const tokens = tokenize('nga');
				expect(tokens).toEqual(['nga']);
			});

			test('initial vowel + final digraph (ang)', () => {
				const tokens = tokenize('ang');
				expect(tokens).toEqual(['a', 'ng']);
			});

			test('initial consonant + final digraph (lang)', () => {
				const tokens = tokenize('lang');
				expect(tokens).toEqual(['la', 'ng']);
			});

			test('ng', () => {
				const tokens = tokenize('ng');
				expect(tokens).toEqual(['na', 'ng']);
			});

			test('mga', () => {
				const tokens = tokenize('mga');
				expect(tokens).toEqual(['ma', 'nga']);
			});
		});

		describe('multisyllabic', () => {
			test('vowels only (oo)', () => {
				const tokens = tokenize('oo');
				expect(tokens).toEqual(['o', 'o']);
			});

			test('syllables with A vowels only (talaga)', () => {
				const tokens = tokenize('talaga');
				expect(tokens).toEqual(['ta', 'la', 'ga']);
			});

			test('initial consonant syllable followed by initial vowel syllable (laruin)', () => {
				const tokens = tokenize('laruin');
				expect(tokens).toEqual(['la', 'ru', 'i', 'n']);
			});

			test('initial digraph x2 (nganga)', () => {
				const tokens = tokenize('nganga');
				expect(tokens).toEqual(['nga', 'nga']);
			});

			test('nga in middle of word (tulungan)', () => {
				const tokens = tokenize('tulungan');
				expect(tokens).toEqual(['tu', 'lu', 'nga', 'n']);
			});

			test('ngi in middle of word (hangin)', () => {
				const tokens = tokenize('hangin');
				expect(tokens).toEqual(['ha', 'ngi', 'n']);
			});
		});
	});

	test('multiple words', () => {
		const tokens = tokenize('kaya kong sumulat sa baybayin');
		expect(tokens).toEqual([
			'ka',
			'ya',
			' ',
			'ko',
			'ng',
			' ',
			'su',
			'mu',
			'la',
			't',
			' ',
			'sa',
			' ',
			'ba',
			'y',
			'ba',
			'yi',
			'n',
		]);
	});

	test('single punctuation (hinirang,)', () => {
		const tokens = tokenize('hinirang,');
		expect(tokens).toEqual(['hi', 'ni', 'ra', 'ng', ',']);
	});

	test('double punctuation (buhay.)', () => {
		const tokens = tokenize('buhay.');
		expect(tokens).toEqual(['bu', 'ha', 'y', '.']);
	});
});
