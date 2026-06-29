/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		mdxRs: true,
		// Don't serve stale dynamic pages from the client router cache, so the
		// projects list shows updated view counts when navigating back to it.
		staleTimes: {
			dynamic: 0,
		},
	},
	// Reverse proxy for PostHog (US region) under /mp so analytics requests go
	// to our own domain and are less likely to be blocked by ad blockers.
	async rewrites() {
		return [
			{
				source: '/mp/static/:path*',
				destination: 'https://us-assets.i.posthog.com/static/:path*',
			},
			{
				source: '/mp/array/:path*',
				destination: 'https://us-assets.i.posthog.com/array/:path*',
			},
			{
				source: '/mp/:path*',
				destination: 'https://us.i.posthog.com/:path*',
			},
		]
	},
	// PostHog's API relies on trailing slashes (e.g. /e/); don't redirect them.
	skipTrailingSlashRedirect: true,
};

export default nextConfig;