"use client";

export function Analytics() {
	return (
		<script
			defer
			data-domain={process.env.NEXT_PUBLIC_DATA_DOMAIN}
			src={process.env.NEXT_PUBLIC_DATA_DOMAIN_SRC}
			data-api="/mp/api/event"
		></script>
	);
}