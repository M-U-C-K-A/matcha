import z from "zod";

export const EditProfileSchema = z.object({
    gender: z.enum(['male', 'female']),
    sex_preference: z.enum(['male', 'female', 'bisexual']),
    bio: z.string()
        .max(255, { message: 'Bio is too long' }),
    city: z.string()
        .max(255, { message: 'City is too long' }),
    latitude: z.number()
        .min(-90, { message: 'latitude is too short'})
        .max(90, { message: 'latitude is too long'}),
    longitude: z.number()
        .min(-180, { message: 'longitude is too short'})
        .max(180, { message: 'longitude is too long'})
})