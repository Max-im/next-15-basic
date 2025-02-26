import { z } from 'zod';

export const createTopicSchema = z.object({
    name: z.string().min(3).max(255).regex(/^[a-z-]+$/, { message: 'Only lowercase letters and dashes are allowed' }),
    description: z.string().min(10).max(255),
})