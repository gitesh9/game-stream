"use client";

import { onBlock, onunBlock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
	isFollowing: boolean;
	userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
	const [isPending, startTransition] = useTransition();

	const handleFollow = () => {
		startTransition(() => {
			onFollow(userId)
				.then((data) =>
					toast.success(
						`You are now following ${data.following.username}`
					)
				)
				.catch(() => toast.error("Something went wrong"));
		});
	};
	const handleUnFollow = () => {
		startTransition(() => {
			onUnFollow(userId)
				.then((data) =>
					toast.success(
						`You've unfollowed ${data.following.username}`
					)
				)
				.catch(() => toast.error("Something went wrong"));
		});
	};

	const onClick = () => {
		if (isFollowing) {
			handleUnFollow();
		} else {
			handleFollow();
		}
	};

	const handleBlock = () => {
		startTransition(() => {
			onunBlock(userId)
				.then((data) =>
					toast.success(`Blocked the user ${data.blocked.username}`)
				)
				.catch(() => toast.error("Something went wrong"));
		});
	};

	return (
		<>
			<Button disabled={isPending} onClick={onClick} variant="primary">
				{isFollowing ? "Unfollow" : "Follow"}
			</Button>
			<Button disabled={isPending} onClick={handleBlock}>
				{/* {isFollowing ? "Unfollow" : "Follow"} */}
				block User
			</Button>
		</>
	);
};
