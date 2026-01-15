import pool from "@/lib/db";
import { existingUser } from "@/lib/utils/existing";

export default async function editProfile(
	userId: string,
	gender: string | undefined,
	sex_preference: string | undefined,
	bio: string | undefined,
	city: string | undefined,
	latitude: number | undefined,
	longitude: number | undefined
) {
	if (!(await existingUser(userId))) {
		throw new Error('User not found');
	}

	await pool.query(`
		UPDATE profiles
		SET gender = $1, sex_preference = $2, bio = $3,
		city = $4, latitude = $5, longitude = $6`,
		[gender, sex_preference, bio, city, latitude, longitude]
	)
}