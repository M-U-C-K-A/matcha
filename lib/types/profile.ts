import z from "zod";

export const EditProfileSchema = z.object({
    gender: z.enum(['male', 'female'])
        .optional(),
    sex_preference: z.enum(['male', 'female', 'bisexual'])
        .optional(),
    bio: z.string()
        .max(255, { message: 'Bio is too long' })
        .optional(),
    city: z.string()
        .max(255, { message: 'City is too long' })
        .optional(),
    latitude: z.number()
        .min(-90, { message: 'latitude is too short'})
        .max(90, { message: 'latitude is too long'})
        .optional(),
    longitude: z.number()
        .min(-180, { message: 'longitude is too short'})
        .max(180, { message: 'longitude is too long'})
        .optional()
})