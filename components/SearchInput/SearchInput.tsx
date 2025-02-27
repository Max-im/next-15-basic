'use client';

import { useSearchParams } from 'next/navigation';
import { Input } from '@heroui/input';
import * as actions from '@/actions';

export default function SearchInput() {
    const searchParams = useSearchParams();
    return (
        <form action={actions.search}>
            <Input name='search' placeholder='Search' defaultValue={searchParams.get('q') || ''} />
        </form>
    )
}
