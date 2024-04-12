import { MouseEventHandler } from 'react';
import { BAYBAYIN } from '@/converter';
import { LabelStyle, Token } from '@/types';
import useLongPress from '@/hooks/useLongPress';
import './Keyboard.css';
import { isVowel } from '@/utils';

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
	function onLongPress(event: Event) {
		console.log('longpress is triggered');
		const baseCharacter = (event.target as HTMLButtonElement).ariaLabel;
		console.log({ baseCharacter });
	}

	function onClick() {
		console.log('click is triggered');
	}

	const defaultOptions = {
		shouldPreventDefault: true,
		delay: 300,
	};

	const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

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
					const shouldLongPress = !isVowel(key as Token);
					return (
						<button
							dangerouslySetInnerHTML={{ __html: label[labelStyle] }}
							aria-label={key}
							data-character={character}
							onClick={handleInput}
							{...(shouldLongPress && longPressEvent)}
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
