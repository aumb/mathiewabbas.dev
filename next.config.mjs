/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		mdxRs: true,
		serverActions: true,
	},
	async rewrites() {
		return [
			{
				source: '/mp/js/script.js',
				destination: 'https://plausible.mathiewabbas.dev/js/script.js',
			},
		]
	},
};

export default nextConfig;