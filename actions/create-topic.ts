'use server';

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createTopicSchema } from "@/schema/create-topic.schema";
import { auth } from '@/app/auth';
import { Topic } from "@prisma/client";
import { db } from "@/db";
import url from '@/url';

export interface CreateTopicState {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[];
    }
}

export async function createTopic(formState: CreateTopicState, formData: FormData): Promise<CreateTopicState> {
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        };
    }

    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['Please login to proceed']
            }
        }
    }

    let topic: Topic;

    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description,
            }
        })
    } catch(err: unknown) {
        const defaultError = 'An error occurred while creating the topic';
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

    revalidatePath(url.homeUrl())
    redirect(url.topicShowUrl(topic.slug));

}