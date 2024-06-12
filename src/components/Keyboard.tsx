import { MouseEventHandler, useEffect, useState } from 'react';
import { useLongPress } from 'react-aria';
import { BAYBAYIN } from '@/converter';
import { Label, LabelStyle, Token } from '@/types';
import { isVowel } from '@/utils';
import FlickMenu from './FlickMenu';
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
	const [flickMenuKey, setFlickMenuKey] = useState<HTMLButtonElement | null>(
		null
	);
	const { longPressProps } = useLongPress({
		accessibilityDescription: 'Long press to show different vowels',
		onLongPress: (event) => {
			setFlickMenuKey(event.target as HTMLButtonElement);
			console.log('longpress', event.target.ariaLabel);
		},
		onLongPressStart: (event) => {
			console.log('longpressstart', event.target.ariaLabel);
		},
		onLongPressEnd: (event) => {
			console.log('longpressend', event.target.ariaLabel);
		},
	});

	function _handleInput(event) {
		if (flickMenuKey) {
			setFlickMenuKey(null);
		}

		handleInput(event);
	}

	useEffect(() => {
		document.addEventListener('mouseup', (event) => {
			console.log('mouseup', (event?.target as HTMLButtonElement).ariaLabel);
		});
	}, []);

	return (
		<>
			<div className="Keyboard">
				<div className="characters">
					{KEYS.map((key) => {
						const character = BAYBAYIN[key];
						const label: Label = {
							latin: key,
							baybayin: character as string,
							both: `${character}<br />${key}`,
						};
						const canLongPress = !isVowel(key as Token);

						return (
							<button
								dangerouslySetInnerHTML={{ __html: label[labelStyle] }}
								aria-label={key}
								data-character={character}
								{...(canLongPress && longPressProps)}
								onClick={_handleInput}
								disabled={
									flickMenuKey !== null && flickMenuKey.ariaLabel !== key
								}
								className={
									flickMenuKey?.ariaLabel === key ? 'long-pressed' : undefined
								}
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

				{flickMenuKey ? (
					<FlickMenu baseKey={flickMenuKey} labelStyle={labelStyle} />
				) : null}
			</div>
		</>
	);
}
