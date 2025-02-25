'use client';

import { useSession } from 'next-auth/react';
import {  NavbarItem } from '@heroui/navbar';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Button } from '@heroui/button';
import { Avatar } from '@heroui/avatar';
import * as actions from '@/app/actions';


export default function HeaderAuth() {
    const { data: session, status } = useSession();
    let authContent: React.ReactNode;
    
    if (status === 'loading') {
        authContent = null;
    } else if (session?.user) {
        authContent = (
            <NavbarItem>
                <Popover placement='left'>
                    <PopoverTrigger>
                        <Avatar src={session.user.image || ''} alt={session.user.name || 'user name'} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className='p-2'>
                            <form action={actions.signOut}>
                                <Button type="submit">Logout</Button>
                            </form>
                        </div>
                    </PopoverContent>
                </Popover>
            </NavbarItem>
        );
    } else {
        authContent = (
            <NavbarItem>
                <form action={actions.signIn}>
                    <Button color='secondary' variant='bordered' type="submit">Login</Button>
                </form>
            </NavbarItem>
        );
    }

    return authContent;
}
