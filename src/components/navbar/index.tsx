"use client"
import { logout } from '@/features/reducer/auth/authSlice';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

type Props = {};

export default function Navbar({ }: Props) {
    const dispatch = useDispatch();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Cek apakah kode sedang dijalankan di lingkungan client-side
        if (typeof window !== 'undefined') {
            const localToken = localStorage.getItem('token');
            setToken(localToken);
        }
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        window.location.reload(); // Atau, navigasi ke halaman lain setelah logout
    };

    return (
        <nav className={`shadow-lg shadow-slate-200 p-4 ${!token ? 'bg-white border-b-2' : 'bg-blue-400'}`}>
            {!token ? (
                <ul className='px-4 sm:px-8 lg:px-20 flex flex-row w-full justify-between items-center'>
                    <li className='font-bold text-xl sm:text-2xl'>
                        <span className='font-bold'>Granada</span> Test
                    </li>
                    <ul className='flex flex-row justify-between w-1/2 sm:w-1/3 lg:w-1/5'>
                        <li>
                            <a href='/auth/login' className='px-6 sm:px-8 py-2 rounded-full font-bold text-center block'>Login</a>
                        </li>
                        <li>
                            <a href='/auth/signup' className='px-6 sm:px-8 py-2 rounded-full bg-blue-400 text-white font-bold text-center block'>Sign up</a>
                        </li>
                    </ul>
                </ul>
            ) : (
                <ul className='px-10 flex flex-row w-full justify-between items-center bg-blue-400 '>
                    <li className='text-2xl text-white'><span className='font-bold '>Granada</span> Test</li>
                    <ul className='flex flex-row justify-between w-1/5'>
                        <li>
                            <button onClick={handleLogout} className={`font-bold px-12 py-2 rounded-full bg-white text-blue-400`}>Logout</button>
                        </li>
                    </ul>
                </ul>
            )}
        </nav>
    );
}
