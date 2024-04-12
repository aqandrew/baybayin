/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [{ source: '/', destination: '/keyboard', permanent: true }];
	},
};

module.exports = nextConfig;
