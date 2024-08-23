"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useSideBar } from "@/store/use-sidebar";

import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

interface WrapperProps {
	children: React.ReactNode;
}
export const Wrapper = ({ children }: WrapperProps) => {
	const [isClient, setIsClient] = useState(false);
	const { collapsed } = useSideBar((state) => state);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return (
			<aside
				className={cn(
					"fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[2D2E35] z-50"
				)}
			>
				<ToggleSkeleton />
				<FollowingSkeleton />
				<RecommendedSkeleton />
			</aside>
		);
	}
	return (
		<aside
			className={cn(
				"fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[2D2E35] z-50",
				collapsed && "w-[70px]"
			)}
		>
			{children}
		</aside>
	);
};
