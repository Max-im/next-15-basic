'use client';

import { useActionState, startTransition } from "react";
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import * as actions from '@/actions';

export default function TopicCreateForm() {
    const [formState, action] = useActionState(actions.createTopic, { errors: {} });

    console.log(formState);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => {
            action(formData);
        });
    }

    return (
        <Popover placement='left-start'>
            <PopoverTrigger>
                <Button color='primary' variant='bordered'>Create Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <Form action={action} onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-4 w-80 p-4'>
                        <h3 className='text-lg'>Create a Topic</h3>
                        <Input 
                            label="Name"
                            labelPlacement='outside'
                            name='name'
                            placeholder='Name'
                            isInvalid={!!formState.errors.name}
                            errorMessage={formState.errors.name?.join(', ')}
                        />
                        <Textarea
                            label="Description"
                            labelPlacement='outside'
                            name='description'
                            placeholder='Description'
                            isInvalid={!!formState.errors.description}
                            errorMessage={formState.errors.description?.join(', ')}
                        />

                        {formState.errors._form && (
                            <div className='p-2 bg-red-200 border border-red-400 rounded'>{formState.errors._form.join(', ')}</div>
                        )}
                        <Button color="primary" type='submit'>Create</Button>
                    </div>
                </Form>
            </PopoverContent>
        </Popover>
    )
}
