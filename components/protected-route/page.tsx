'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { user } = useAuth();

    // Prevent user to access to dashboard
    // when they're not logged in to their account
    useEffect(() => {
        if (!user.uid) {
            router.push('/');
        }
    }, [router, user]);

    return <div>{user ? children : null}</div>;
};

export default ProtectedRoute;