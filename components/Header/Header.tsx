import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarItem, NavbarContent } from '@heroui/navbar';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Avatar } from '@heroui/avatar';
import * as actions from '@/app/actions';
import { auth } from '@/app/auth';

export default async function Header() {
    const session = await auth();
    let authContent: React.ReactNode;

    if (session?.user) {
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

    return (
        <header>
            <Navbar className='shadow mb-6'>
                <NavbarBrand>
                    <Link href='/' className="font-bold">Discuss</Link>
                </NavbarBrand>

                <NavbarContent justify='center'>
                    <NavbarItem>
                        <Input placeholder='Search' />
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent justify='end'>
                    {authContent}
                </NavbarContent>
            </Navbar>
        </header>
    )
}
