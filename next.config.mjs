/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		mdxRs: true,
	},
	async rewrites() {
		return [
			{
				source: '/mp/js/script.js',
				destination: process.env.PLAUSIBLE_SCRIPT_URL || 'https://plausible.io/js/script.js',
			},
		]
	},
};

export default nextConfig;