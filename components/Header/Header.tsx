import { Suspense } from 'react';
import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarItem, NavbarContent } from '@heroui/navbar';
import HeaderAuth from './HeaderAuth';
import SearchInput from '../SearchInput';

export default function Header() {
    return (
        <header>
            <Navbar className='shadow mb-6'>
                <NavbarBrand>
                    <Link href='/' className="font-bold">Discuss</Link>
                </NavbarBrand>

                <NavbarContent justify='center'>
                    <NavbarItem>
                        <Suspense fallback={<div>Loading...</div>}>
                            <SearchInput />
                        </Suspense>
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent justify='end'>
                    <HeaderAuth />
                </NavbarContent>
            </Navbar>
        </header>
    )
}
