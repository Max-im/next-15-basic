'use server';

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createPostSchema } from "@/schema/create-post.schema";
import { auth } from '@/auth';
import { Post } from "@prisma/client";
import { db } from "@/db";
import url from '@/url';

export interface CreatePostState {
    errors: {
        title?: string[];
        content?: string[];
        _form?: string[];
    }
}

export async function createPost(slug: string, formState: CreatePostState, formData: FormData): Promise<CreatePostState> {
    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        };
    }

    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return {
            errors: {
                _form: ['Please login to proceed']
            }
        }
    }

    const topic = await db.topic.findUnique({
        where: { slug}
    });

    if (!topic) {
        return {
            errors: {
                _form: ['Topic not found']
            }
        }
    }

    let post: Post;

    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id
            }
        })
    } catch(err: unknown) {
        const defaultError = 'An error occurred while creating the post';
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message || defaultError]
                }
            }
        } else {
            return {
                errors: {
                    _form: [defaultError]
                }
            }
        }
    }

    revalidatePath(url.topicShowUrl(topic.slug))
    redirect(url.postShowUrl(topic.slug, post.id));
}