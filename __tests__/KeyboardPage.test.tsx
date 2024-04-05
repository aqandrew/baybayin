import { afterEach, beforeAll, describe, expect, it, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { convertToBaybayin } from '@/utils';
import KeyboardPage from '@/app/keyboard/page';

describe('KeyboardPage', () => {
	let textarea: HTMLTextAreaElement;
	let clearButton: HTMLButtonElement;

	beforeAll(async () => {
		render(<KeyboardPage />);
		textarea = await screen.findByLabelText('Baybayin text');
		clearButton = await screen.findByText('clear');
	});

	afterEach(() => {
		fireEvent.click(clearButton);
	});

	it('renders empty text input', () => {
		expect(textarea.textContent).toBe('');
	});

	it('inputs `a` characters', () => {
		fireEvent.click(screen.getByLabelText('a'));
		fireEvent.click(screen.getByLabelText('ba'));
		fireEvent.click(screen.getByLabelText('ka'));
		fireEvent.click(screen.getByLabelText('da'));
		expect(textarea.textContent).toBe(convertToBaybayin('abakada'));
	});

	test('clear button', () => {
		fireEvent.click(screen.getByLabelText('nga'));
		fireEvent.click(screen.getByLabelText('nga'));

		expect(textarea.textContent).toBe(convertToBaybayin('nganga'));

		fireEvent.click(clearButton);

		expect(textarea.textContent).toBe('');
	});
});
