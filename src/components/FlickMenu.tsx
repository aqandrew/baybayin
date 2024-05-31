import { Label, LabelStyle } from '@/types';
import { BAYBAYIN } from '@/converter';
import './FlickMenu.css';

interface FlickMenuProps {
	baseKey: HTMLButtonElement;
	labelStyle: LabelStyle;
}

export default function FlickMenu({ baseKey, labelStyle }: FlickMenuProps) {
	const { top, left } = baseKey.getBoundingClientRect();
	const key = baseKey.ariaLabel as keyof typeof BAYBAYIN;
	const character = BAYBAYIN[key];
	const consonant = key.substring(0, key.length - 1);
	const latinIE = `${consonant}i/${consonant}e`;
	const baybayinIE = character + BAYBAYIN.vowelSign.i;
	const baybayinVirama = character + BAYBAYIN.virama.kudlit;
	const latinUO = `${consonant}u/${consonant}o`;
	const baybayinUO = character + BAYBAYIN.vowelSign.u;

	const labelIE: Label = {
		latin: latinIE,
		baybayin: baybayinIE,
		both: `${baybayinIE}<br />${latinIE}`,
	};
	const labelVirama: Label = {
		latin: consonant,
		baybayin: baybayinVirama,
		both: `${baybayinVirama}<br />${consonant}`,
	};
	const labelUO: Label = {
		latin: latinUO,
		baybayin: baybayinUO,
		both: `${baybayinUO}<br />${latinUO}`,
	};

	return (
		<div className="FlickMenu" style={{ top, left }}>
			<button
				className="left"
				dangerouslySetInnerHTML={{ __html: labelIE[labelStyle] }}
			/>
			<button
				className="top"
				dangerouslySetInnerHTML={{ __html: labelVirama[labelStyle] }}
			/>
			<button
				className="right"
				dangerouslySetInnerHTML={{ __html: labelUO[labelStyle] }}
			/>
		</div>
	);
}
