import { MouseEventHandler } from 'react';
import { BAYBAYIN } from '@/converter';
import { KeyboardDisplay } from '@/app/keyboard/page';
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
	keyboardDisplay: KeyboardDisplay;
	handleInput: MouseEventHandler;
	handleDelete: MouseEventHandler;
}

export default function Keyboard({
	keyboardDisplay,
	handleInput,
	handleDelete,
}: KeyboardProps) {
	return (
		<div className="Keyboard">
			<div className="characters">
				{KEYS.map((key) => {
					const character = BAYBAYIN[key];
					const label: { [K in KeyboardDisplay]: string } = {
						latin: key,
						baybayin: character as string,
						both: `${character}<br />${key}`,
					};
					return (
						<button
							dangerouslySetInnerHTML={{ __html: label[keyboardDisplay] }}
							aria-label={key}
							data-character={character}
							onClick={handleInput}
							key={key}
						/>
					);
				})}
			</div>

			<div className="functions">
				<button onClick={handleDelete}>delete</button>
				<button>space</button>
				<button>return</button>
			</div>
		</div>
	);
}
