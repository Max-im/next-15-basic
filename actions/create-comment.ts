'use server';

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/db";
import { createCommentSchema } from "@/schema/create-post.schema copy";
import url from "@/url";

export interface CreateCommentState {
    errors: {
        title?: string[];
        content?: string[];
        _form?: string[];
    },
    success?: boolean;
}

interface BindData {
    postId: string;
    parentId: string | undefined;
    slug: string;
}

export async function createComment({ postId, parentId, slug }: BindData, formState: CreateCommentState, formData: FormData): Promise<CreateCommentState> {
    const result = createCommentSchema.safeParse({
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

    const post = await db.post.findUnique({
        where: { id: postId }
    });

    if (!post) {
        return {
            errors: {
                _form: ['Post not found']
            }
        }
    }

    try {
        await db.comment.create({
            data: {
                content: result.data.content,
                userId: session.user.id,
                postId,
                parentId
            }
        })
    } catch (err: unknown) {
        const defaultError = 'An error occurred while creating the comment';
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

    revalidatePath(url.postShowUrl(slug, postId));

    return {
        errors: {},
        success: true
    }
}