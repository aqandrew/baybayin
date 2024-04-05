import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<>
					<header>
						<nav>
							<Link href="/converter">converter</Link>
							<Link href="/keyboard">keyboard</Link>
						</nav>
					</header>
					<main>{children}</main>
				</>
			</body>
		</html>
	);
}
