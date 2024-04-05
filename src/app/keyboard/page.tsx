'use client';

import { ChangeEvent, MouseEvent, useState } from 'react';
import Keyboard from '@/components/Keyboard';
import './page.css';

const keyboardDisplays = ['latin', 'baybayin', 'both'] as const;
export type KeyboardDisplay = (typeof keyboardDisplays)[number];

export default function KeyboardPage() {
	const [baybayinText, setBaybayinText] = useState('');
	const [keyboardDisplay, setKeyboardDisplay] =
		useState<KeyboardDisplay>('latin');

	function isKeyboardDisplayChecked(value: KeyboardDisplay) {
		return keyboardDisplay === value;
	}

	function handleKeyboardDisplayChange(event: ChangeEvent) {
		const { target } = event;
		setKeyboardDisplay((target as HTMLInputElement).value as KeyboardDisplay);
	}

	function handleInput(event: MouseEvent) {
		const { target } = event;
		setBaybayinText(
			baybayinText + (target as HTMLButtonElement).dataset.character
		);
	}

	function handleDelete() {
		setBaybayinText(baybayinText.substring(0, baybayinText.length - 1));
	}

	function handleClear() {
		setBaybayinText('');
	}

	return (
		<>
			<h1>keyboard</h1>

			<button onClick={handleClear}>clear</button>
			<label className="text-output">
				Baybayin text
				<textarea id="text" name="text" value={baybayinText} readOnly />
			</label>

			<Keyboard
				keyboardDisplay={keyboardDisplay}
				handleInput={handleInput}
				handleDelete={handleDelete}
			/>

			<div className="radio-group">
				{keyboardDisplays.map((display) => (
					<label key={display}>
						<input
							type="radio"
							name="keyboard-display"
							value={display}
							checked={isKeyboardDisplayChecked(display)}
							onChange={handleKeyboardDisplayChange}
						/>
						{display}
					</label>
				))}
			</div>
		</>
	);
}
