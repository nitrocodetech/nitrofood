'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginPage from '@/components/auth/login';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const { accessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (accessToken) {
      router.push('/dashboard');
    } else {
      setIsLoggedIn(false);
    }
  }, [accessToken]);

  if (isLoggedIn === null) return null;
  console.log(accessToken);

  return <LoginPage />;
}
