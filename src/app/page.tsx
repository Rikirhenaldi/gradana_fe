'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.replace('/main/home'); // Redirect to main home page if token exists
    } else {
      router.replace('/auth/login'); // Redirect to login page if token doesn't exist
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <p className="text-xl font-semibold mb-2">Gradana Test</p>
      <p className="text-lg font-semibold">Riki Rhenaldi</p>
    </div>
  );
};

export default Home;
