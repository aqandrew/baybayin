import { BAYBAYIN } from '@/converter';
import './Keyboard.css';
import { KeyboardDisplay } from '@/app/keyboard/page';

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
}

export default function Keyboard({ keyboardDisplay }: KeyboardProps) {
	return (
		<div className="Keyboard">
			{KEYS.map((key) => {
				const character = BAYBAYIN[key];
				const label: { [K in KeyboardDisplay]: string } = {
					latin: key,
					baybayin: character as string,
					both: `${character}<br />${key}`,
				};

				return (
					<button
						key={key}
						dangerouslySetInnerHTML={{ __html: label[keyboardDisplay] }}
					/>
				);
			})}
		</div>
	);
}
