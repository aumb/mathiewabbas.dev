"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
		if (!key) return;

		posthog.init(key, {
			// Reverse-proxied through this app (see next.config.mjs) so requests
			// go to our own domain and are less likely to be hit by ad blockers.
			api_host: "/mp",
			ui_host: "https://us.posthog.com",
			// We capture pageviews manually below to handle App Router navigations.
			capture_pageview: false,
			capture_pageleave: true,
		});
	}, []);

	return (
		<PHProvider client={posthog}>
			<SuspendedPostHogPageView />
			{children}
		</PHProvider>
	);
}

function PostHogPageView() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const posthog = usePostHog();

	useEffect(() => {
		if (!pathname || !posthog) return;
		let url = window.origin + pathname;
		const search = searchParams.toString();
		if (search) url += `?${search}`;
		posthog.capture("$pageview", { $current_url: url });
	}, [pathname, searchParams, posthog]);

	return null;
}

// useSearchParams() must be wrapped in Suspense to avoid de-opting the whole
// app to client-side rendering.
function SuspendedPostHogPageView() {
	return (
		<Suspense fallback={null}>
			<PostHogPageView />
		</Suspense>
	);
}
