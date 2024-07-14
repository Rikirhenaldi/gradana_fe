import axios from 'axios';
import { serialize } from 'cookie'; 

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    console.log("masuk axios")
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.token) {
      // Set cookie with token
      const token = response.data.token;
      console.log("ini token::::::", token)
      const cookieValue = serialize('token', token, {
        secure: true, // Hanya kirim cookie di atas HTTPS (saat di production)
        httpOnly: true, // Tidak dapat diakses dari JavaScript di browser
        sameSite: 'strict', // Proteksi dari CSRF
        path: '/', // Semua halaman
        maxAge: 3600, // Umur cookie dalam detik (contoh: 1 jam)
      });
      // Set cookie dalam header Set-Cookie
      if (response.headers['Set-Cookie']) {
        response.headers['Set-Cookie'] += `; ${cookieValue}`;
      } else {
        response.headers['Set-Cookie'] = cookieValue;
      }

      console.log("Cookie yang diatur:", cookieValue);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("axios masuk error")
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');

        // Clear cookies (assuming token is stored as a cookie named 'token')
        document.cookie = 'token=; Max-Age=0; path=/;';

        // Redirect to login page
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
