import { describe, expect, test } from 'vitest';
import { tokenize } from './tokenizer';
import { BAYBAYIN, convert } from './converter';

describe('converter', () => {
	test('talaga', () => {
		const input = 'talaga';
		const tokens = tokenize(input);
		const output = convert(tokens);
		expect(output).toBe([BAYBAYIN.ta, BAYBAYIN.la, BAYBAYIN.ga].join(''));
	});

	test('oo', () => {
		const input = 'oo';
		const tokens = tokenize(input);
		const output = convert(tokens);
		expect(output).toBe([BAYBAYIN.u, BAYBAYIN.u].join(''));
	});

	test('at', () => {
		const input = 'at';
		const tokens = tokenize(input);
		const output = convert(tokens);
		expect(output).toBe(
			[BAYBAYIN.a, BAYBAYIN.ta, BAYBAYIN.virama.kudlit].join('')
		);
	});

	test('puti', () => {
		const input = 'puti';
		const tokens = tokenize(input);
		const output = convert(tokens);
		expect(output).toBe(
			[
				BAYBAYIN.pa,
				BAYBAYIN.vowelSign.u,
				BAYBAYIN.ta,
				BAYBAYIN.vowelSign.i,
			].join('')
		);
	});

	test('hangin', () => {
		const input = 'hangin';
		const tokens = tokenize(input);
		const output = convert(tokens);
		expect(output).toBe(
			[
				BAYBAYIN.ha,
				BAYBAYIN.nga,
				BAYBAYIN.vowelSign.i,
				BAYBAYIN.na,
				BAYBAYIN.virama.kudlit,
			].join('')
		);
	});

	test.skip('single punctuation', () => {
		const input = 'hinirang,';
		const tokens = tokenize(input);
		const output = convert(tokens);
		expect(output).toEqual(
			[
				BAYBAYIN.ha,
				BAYBAYIN.vowelSign.i,
				BAYBAYIN.na,
				BAYBAYIN.vowelSign.i,
				BAYBAYIN.ra,
				BAYBAYIN.nga,
				BAYBAYIN.virama.kudlit,
				BAYBAYIN.punctuation.single,
			].join('')
		);
	});

	test.skip('double punctuation', () => {
		const input = 'buhay.';
		const tokens = tokenize(input);
		const output = convert(tokens);
		expect(output).toEqual(
			[
				BAYBAYIN.ba,
				BAYBAYIN.u,
				BAYBAYIN.ha,
				BAYBAYIN.ya,
				BAYBAYIN.virama.kudlit,
			].join('')
		);
	});
});
