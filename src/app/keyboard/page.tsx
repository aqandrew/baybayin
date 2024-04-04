'use client';

import { ChangeEvent, useState } from 'react';
import Keyboard from '@/components/Keyboard';
import './page.css';

const keyboardDisplays = ['latin', 'baybayin', 'both'] as const;
export type KeyboardDisplay = (typeof keyboardDisplays)[number];

export default function KeyboardPage() {
	const [keyboardDisplay, setKeyboardDisplay] =
		useState<KeyboardDisplay>('latin');

	function isKeyboardDisplayChecked(value: KeyboardDisplay) {
		return keyboardDisplay === value;
	}

	function handleKeyboardDisplayChange(event: ChangeEvent) {
		const { target } = event;
		setKeyboardDisplay((target as HTMLInputElement).value as KeyboardDisplay);
	}

	return (
		<>
			<h1>keyboard</h1>

			<textarea name="text" />

			<Keyboard keyboardDisplay={keyboardDisplay} />

			<div className="radio-group">
				{keyboardDisplays.map((display) => (
					<label>
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
