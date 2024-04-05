'use client';

import { ChangeEvent, MouseEvent, useState } from 'react';
import { LabelStyle, LABEL_STYLES } from '@/types';
import Keyboard from '@/components/Keyboard';
import './page.css';

export default function KeyboardPage() {
	const [baybayinText, setBaybayinText] = useState('');
	const [labelStyle, setLabelStyle] = useState<LabelStyle>('latin');

	function isLabelStyleChecked(value: LabelStyle) {
		return labelStyle === value;
	}

	function handleLabelStyleDisplayChange(event: ChangeEvent) {
		const { target } = event;
		setLabelStyle((target as HTMLInputElement).value as LabelStyle);
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

			<button onClick={handleClear} aria-label="clear">
				clear
			</button>
			<label className="text-output">
				Baybayin text
				<textarea id="text" name="text" value={baybayinText} readOnly />
			</label>

			<Keyboard
				labelStyle={labelStyle}
				handleInput={handleInput}
				handleDelete={handleDelete}
			/>

			<fieldset>
				<legend>labels</legend>

				<div className="radio-group">
					{LABEL_STYLES.map((labelStyle) => (
						<label key={labelStyle}>
							<input
								type="radio"
								name="label"
								value={labelStyle}
								checked={isLabelStyleChecked(labelStyle)}
								onChange={handleLabelStyleDisplayChange}
							/>
							{labelStyle}
						</label>
					))}
				</div>
			</fieldset>
		</>
	);
}
