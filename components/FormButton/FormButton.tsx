'use client';

import { Button } from '@heroui/button';

interface FormButtonProps {
    children: React.ReactNode;
    isLoading: boolean;
}

export default function FormButton({ children, isLoading }: FormButtonProps) {
    return (
        <Button color="primary" type='submit' isLoading={isLoading}>{children}</Button>
    )
}
