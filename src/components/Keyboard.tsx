import { MouseEventHandler, useState } from 'react';
import { useLongPress } from 'react-aria';
import { BAYBAYIN } from '@/converter';
import { LabelStyle, Token } from '@/types';
import { isVowel } from '@/utils';
import { createPortal } from 'react-dom';
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
	const [flickMenuCharacter, setFlickMenuCharacter] = useState<
		keyof typeof BAYBAYIN | null
	>(null);
	const { longPressProps } = useLongPress({
		accessibilityDescription: 'Long press to show different vowels',
		onLongPress: (event) => {
			const baseCharacter = event.target.ariaLabel;
			setFlickMenuCharacter(baseCharacter);
			console.log({ baseCharacter });
		},
	});

	function _handleInput(event) {
		if (flickMenuCharacter) {
			setFlickMenuCharacter(null);
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
								onMouseUp={() => console.log('mouseup')}
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

			{flickMenuCharacter
				? createPortal(
						<FlickMenu baseCharacter={flickMenuCharacter} />,
						document.body
				  )
				: null}
		</>
	);
}
