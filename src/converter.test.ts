import { describe, expect, test } from 'vitest';
import { tokenize } from './tokenizer';
import { BAYBAYIN, convert } from './converter';

describe('converter', () => {
	test('talaga', () => {
		const input = 'talaga';
		const tokens = tokenize(input);
		const output = convert(tokens);
		expect(output).toBe(BAYBAYIN.ta + BAYBAYIN.la + BAYBAYIN.ga);
	});

	test.skip('oo', () => {
		const input = 'oo';
		const tokens = tokenize(input);
		const output = convert(tokens);
		expect(output).toBe(BAYBAYIN.u + BAYBAYIN.u);
	});

	test.skip('at', () => {
		const input = 'at';
		const tokens = tokenize(input);
		const output = convert(tokens);
		expect(output).toBe(BAYBAYIN.a + BAYBAYIN.ta + BAYBAYIN.virama.kudlit);
	});

	test.skip('puti', () => {
		const input = 'puti';
		const tokens = tokenize(input);
		const output = convert(tokens);
		expect(output).toBe(
			BAYBAYIN.pa + BAYBAYIN.vowelSign.u + BAYBAYIN.ta + BAYBAYIN.vowelSign.i
		);
	});
});
