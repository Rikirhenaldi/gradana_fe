'use server'
import axiosInstance from '@/utils/axiosInstance';

export async function create(email: string, password: string): Promise<string> {
  try {
    const response = await axiosInstance.post<{ token: string }>('/api/auth/login', { email, password });

    // Set cookie dalam header Set-Cookie
    const cookieOptions = {
      secure: true, 
      httpOnly: true, // Tidak dapat diakses dari JavaScript di browser
      sameSite: 'strict', // Proteksi dari CSRF
      path: '/', // Semua halaman
      maxAge: 3600, // Umur cookie dalam detik (contoh: 1 jam)
    };

    // Mengatur cookie dengan menggunakan header Set-Cookie
    const cookieHeaderValue = `token=${encodeURIComponent(response.data.token)}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`;

    // Tambahkan cookie ke respons HTTP
    response.headers['Set-Cookie'] = cookieHeaderValue;

    return response.data.token; // Return the token
  } catch (error) {
    console.error('Gagal melakukan request:', error);
    throw error;
  }
}
