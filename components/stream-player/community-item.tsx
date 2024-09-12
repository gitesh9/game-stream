"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { onBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";

interface CommunityItemProps {
	hostName: string;
	viewerName: string;
	participantName?: string;
	participantIdentity: string;
}
export const CommunityItem = ({
	hostName,
	viewerName,
	participantName,
	participantIdentity,
}: CommunityItemProps) => {
	const color = stringToColor(participantName || "");
	const isSelf = participantName === viewerName;
	const [pending, startTransition] = useTransition();
	const isHost = viewerName === hostName;

	const handleBlock = () => {
		if (!participantName || isSelf || !isHost) {
			return;
		}
		startTransition(() => {
			onBlock(participantIdentity)
				.then(() => toast.success(`Blocked ${participantName}`))
				.catch(() => toast.error("Something went wrong!!"));
		});
	};

	return (
		<div
			className={cn(
				"group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
				pending && "opacity-50 pointer-events-none"
			)}
		>
			<p style={{ color: color }}>{participantName}</p>
			{isHost && !isSelf && (
				<Hint label="Block">
					<Button
						disabled={pending}
						onClick={handleBlock}
						className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
						variant="ghost"
					>
						<MinusCircle className="h-4 w-4 text-muted-foreground" />
					</Button>
				</Hint>
			)}
		</div>
	);
};
