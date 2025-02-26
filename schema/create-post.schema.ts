import { z } from 'zod';

export const createPostSchema = z.object({
    title: z.string().min(3).max(255),
    content: z.string().min(10).max(1024),
})