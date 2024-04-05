import { MouseEventHandler } from 'react';
import { BAYBAYIN } from '@/converter';
import { LabelStyle } from '@/app/keyboard/page';
import './Keyboard.css';

const KEYS: (keyof typeof BAYBAYIN)[] = [
	'a',
	'i',
	'u',
	'ba',
	'ka',
	'da',
	'ga',
	'ha',
	'la',
	'ma',
	'na',
	'nga',
	'pa',
	'ra',
	'sa',
	'ta',
	'wa',
	'ya',
];

interface KeyboardProps {
	labelStyle: LabelStyle;
	handleInput: MouseEventHandler;
	handleDelete: MouseEventHandler;
}

export default function Keyboard({
	labelStyle,
	handleInput,
	handleDelete,
}: KeyboardProps) {
	return (
		<div className="Keyboard">
			<div className="characters">
				{KEYS.map((key) => {
					const character = BAYBAYIN[key];
					const label: { [K in LabelStyle]: string } = {
						latin: key,
						baybayin: character as string,
						both: `${character}<br />${key}`,
					};
					return (
						<button
							dangerouslySetInnerHTML={{ __html: label[labelStyle] }}
							aria-label={key}
							data-character={character}
							onClick={handleInput}
							key={key}
						/>
					);
				})}
			</div>

			<div className="functions">
				<button aria-label="delete" onClick={handleDelete}>
					delete
				</button>
				<button aria-label="space">space</button>
				<button aria-label="return">return</button>
			</div>
		</div>
	);
}
