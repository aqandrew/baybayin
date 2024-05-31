import { MouseEventHandler, useState } from 'react';
import { useLongPress } from 'react-aria';
import { BAYBAYIN } from '@/converter';
import { LabelStyle, Token } from '@/types';
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
		},
	});

	function _handleInput(event) {
		if (flickMenuKey) {
			setFlickMenuKey(null);
		}

		handleInput(event);
	}

	return (
		<>
			<div className="Keyboard">
				<div className="characters">
					{KEYS.map((key) => {
						const character = BAYBAYIN[key];
						const label: { [K in LabelStyle]: string } = {
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

				{flickMenuKey ? <FlickMenu baseKey={flickMenuKey} /> : null}
			</div>
		</>
	);
}
