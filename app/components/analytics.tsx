"use client";

export function Analytics() {
	return (
		<script defer data-domain={process.env.DATA_DOMAIN} src={process.env.DATA_DOMAIN_SRC}></script>
	);
}
