"use client";

import {
	ArrowLeftFromLine,
	ArrowRightFromLine,
	MessageSquare,
	Users,
} from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ChatVariant, useChatSideBar } from "@/store/use-chat-sidebar";

export const VariantToggle = () => {
	const { variant, onChangeVariant } = useChatSideBar((state) => state);

	const isChat = variant === ChatVariant.CHAT;

	let Icon = isChat ? Users : MessageSquare;

	const onToggle = () => {
		const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
		onChangeVariant(newVariant);
	};

	const label = isChat ? "Community" : "Go back to chat";

	return (
		<Hint label={label} asChild>
			<Button
				onClick={onToggle}
				variant="ghost"
				className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
			>
				<Icon className="h-4 w-4" />
			</Button>
		</Hint>
	);
};
