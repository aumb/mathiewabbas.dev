"use server";

import { getServicePb } from "@/lib/pocketbase-server";

export async function incrementViews(recordId: string): Promise<number | null> {
	try {
		const pb = await getServicePb();
		const record = await pb.collection("projects").getOne(recordId);
		const updated = await pb.collection("projects").update(recordId, {
			views: (record.views || 0) + 1,
		});
		return updated.views ?? null;
	} catch (error) {
		console.error("Error incrementing views:", error);
		return null;
	}
}
