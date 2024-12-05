"use client";

import { useEffect } from "react";
import { incrementViews } from "@/lib/pocketbase";

interface Props {
	id: string;
}

export const ReportView: React.FC<Props> = ({ id }) => {
	useEffect(() => {
		incrementViews(id);
	}, [id]);

	return null;
};
