import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import * as actions from '@/actions';

export default function TopicCreateForm() {
    return (
        <Popover placement='left-start'>
            <PopoverTrigger>
                <Button color='primary' variant='bordered'>Create Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={actions.createTopic}>
                    <div className='flex flex-col gap-4 w-80 p-4'>
                        <h3 className='text-lg'>Create a Topic</h3>
                        <Input label="Name" labelPlacement='outside' name='name' placeholder='Name' />
                        <Textarea label="Description" labelPlacement='outside' name='description' placeholder='Description' />
                        <Button color="primary" type='submit'>Create</Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}
