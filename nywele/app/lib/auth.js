// app/lib/auth.js
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_EXPIRY_MINUTES = 5;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function login(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const expires = new Date(Date.now() + SESSION_EXPIRY_MINUTES * 60 * 1000);
        cookies().set(SESSION_COOKIE_NAME, 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires,
        });
        redirect('/admin');
    } else {
        // Return an error object instead of just logging to the console
        return { error: 'Wrong credentials' };
    }
}

export async function logout() {
    cookies().delete(SESSION_COOKIE_NAME);
    redirect('/login');
}