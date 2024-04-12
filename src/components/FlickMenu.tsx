import { BAYBAYIN } from '@/converter';
import './FlickMenu.css';

interface FlickMenuProps {
	baseCharacter: keyof typeof BAYBAYIN;
}

export default function FlickMenu({ baseCharacter }: FlickMenuProps) {
	return (
		<div className="FlickMenu">
			<button>left</button>
			<button>top</button>
			<button>right</button>
		</div>
	);
}
