"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type ActionsProps = {
	isFollowing: boolean;
	hostIdentity: string;
	isHost: boolean;
};
export const Actions = ({
	isFollowing,
	isHost,
	hostIdentity,
}: ActionsProps) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const { userId } = useAuth();

	const handleFollow = () => {
		startTransition(() => {
			onFollow(hostIdentity)
				.then((data) =>
					toast.success(
						`You are now following ${data.following.username}`
					)
				)
				.catch(() => toast.error("Something went wrong!"));
		});
	};

	const handleUnfollow = () => {
		startTransition(() => {
			onUnFollow(hostIdentity)
				.then((data) =>
					toast.success(
						`You have unfollowed ${data.following.username}`
					)
				)
				.catch(() => toast.error("Something went wrong!"));
		});
	};

	const toggleFollow = () => {
		if (!userId) {
			return router.push("/sign-in");
		}

		if (isHost) {
			return;
		}

		if (isFollowing) {
			handleUnfollow();
		} else {
			handleFollow();
		}
	};

	return (
		<Button
			disabled={isPending || isHost}
			onClick={toggleFollow}
			variant="primary"
			size="sm"
			className="w-full lg:w-auto"
		>
			<Heart
				className={cn(
					"h-4 w-4 mr-2",
					isFollowing ? "fill-white" : "fill-none"
				)}
			/>
			{isFollowing ? "Unfollow" : "Follow"}
		</Button>
	);
};

export const ActionsSkeleton = () => {
	return <Skeleton className="h-10 w-full lg:w-24" />;
};
