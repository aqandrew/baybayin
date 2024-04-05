import { beforeAll, describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { convertToBaybayin } from '@/utils';
import KeyboardPage from '@/app/keyboard/page';

describe('KeyboardPage', () => {
	let textarea: HTMLTextAreaElement;

	beforeAll(async () => {
		render(<KeyboardPage />);
		textarea = await screen.findByLabelText('Baybayin text');
	});

	test('renders empty text input', () => {
		expect(textarea.textContent).toMatch('');
	});

	test('inputs `a` characters', () => {
		fireEvent.click(screen.getByLabelText('a'));
		fireEvent.click(screen.getByLabelText('ba'));
		fireEvent.click(screen.getByLabelText('ka'));
		fireEvent.click(screen.getByLabelText('da'));
		expect(textarea.textContent).toMatch(convertToBaybayin('abakada'));
	});
});
