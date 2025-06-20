"use server";

import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const updateStream = async (values: Partial<Stream>) => {
	try {
		const self = await getSelf();
		const selfStream = await db.stream.findUnique({
			where: {
				userId: self.id,
			},
		});

		if (!selfStream) {
			throw new Error("Stream not found");
		}

		const validData = {
			thumbnailUrl: values.thumbnailUrl,
			name: values.name,
			isChatEnabled: values.isChatEnabled,
			isChatDelayed: values.isChatDelayed,
			isChatFollowersOnly: values.isChatFollowersOnly,
		};

		const stream = await db.stream.update({
			where: {
				id: selfStream.id,
			},
			data: {
				...validData,
			},
		});

		revalidatePath(`/u/${self.username}/chat`);
		revalidatePath(`/u/${self.username}`);
		revalidatePath(`/${self.username}`);

		return stream;
	} catch {
		throw new Error("Internal Error");
	}
};
