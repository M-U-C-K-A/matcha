import z from "zod";

export const messageSchema = z.object({
	content: z.string()
		.min(1, { message: `Message can't be empty`})
		.max(255, { message: 'Message is too long'}),
	other_user_id: z.string()
		.min(1, { message: 'Other user not found'})
		.max(200, { message: 'Other user id is too long'})
})