import getUserConversation from "@/lib/services/conversation/getConversation";
import sendMessage from "@/lib/services/conversation/sendMessage";
import { messageSchema } from "@/lib/types/conversation";
import getUserIdFromToken from "@/lib/utils/middleware";
import { API_ERRORS } from "@/lib/utils/response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	if (req.method != 'POST') {
		return NextResponse.json (
			{ error: API_ERRORS.METHOD_FORBIDDEN },
			{ status: 405 }
		)
	}

	const userId = await getUserIdFromToken(req);
	if (!userId) {
		return NextResponse.json (
			{ error: API_ERRORS.UNAUTHORIZED},
			{ status: 401 }
		)
	}

	const body = await req.json();
	
	const data = messageSchema.safeParse(body);

	if (!data.success) {
		return NextResponse.json (
			{ message: API_ERRORS.BAD_REQUEST },
			{ status: 400 }
		)
	}

	const { content, other_user_id} = data.data;
	try {
		const result = await sendMessage(
			userId,
			other_user_id,
			content
		)

		return NextResponse.json (
			result,
			{ status: 200 }
		);
	} catch (err: any) {
		if (err.message === 'User not found') {
			return NextResponse.json (
				{ error: API_ERRORS.NOT_FOUND },
				{ status: 404 }
			)
		}

		return NextResponse.json (
			{ error: API_ERRORS.INTERNAL_ERROR },
			{ status: 500 }
		)
	}
}