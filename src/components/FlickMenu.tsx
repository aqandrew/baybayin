import './FlickMenu.css';

interface FlickMenuProps {
	baseKey: HTMLButtonElement;
}

export default function FlickMenu({ baseKey }: FlickMenuProps) {
	const { top, left } = baseKey.getBoundingClientRect();

	return (
		<div className="FlickMenu" style={{ top, left }}>
			<button className="left">left</button>
			<button className="top">top</button>
			<button className="right">right</button>
		</div>
	);
}
