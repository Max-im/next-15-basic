'use client';

import { useActionState, startTransition } from "react";
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import * as actions from '@/actions';
import FormButton from "../FormButton";

interface PostCreateFormProps {
    slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
    const [formState, action, isPending] = useActionState(actions.createPost.bind(null, slug), { errors: {} });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => {
            action(formData);
        });
    }

    return (
        <Popover placement="left-start">
            <PopoverTrigger>
                <Button color='primary' variant='bordered'>Create Post</Button>
            </PopoverTrigger>
            <PopoverContent>
                <Form action={action} onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-4 w-80 p-4'>
                        <h3 className='text-lg'>Create a Post</h3>
                        <Input
                            label="Title"
                            name='title'
                            placeholder='Title'
                            labelPlacement='outside'
                            isInvalid={!!formState.errors.title}
                            errorMessage={formState.errors.title?.join(', ')}
                        />
                        <Textarea
                            label="Content"
                            name='content'
                            placeholder='Content'
                            labelPlacement='outside'
                            isInvalid={!!formState.errors.content}
                            errorMessage={formState.errors.content?.join(', ')}
                        />

                        {formState.errors._form && (
                            <div className='p-2 bg-red-200 border border-red-400 rounded'>{formState.errors._form.join(', ')}</div>
                        )}
                        <FormButton isLoading={isPending}>Create Post</FormButton>
                    </div>
                </Form>
            </PopoverContent>
        </Popover>
    )
}
