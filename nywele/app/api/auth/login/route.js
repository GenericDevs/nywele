// app/api/auth/login/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
    const { username, password } = await req.json();

    // ✅ Read credentials from .env
    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (username === validUsername && password === validPassword) {
        // Create response
        const res = NextResponse.json({ success: true });

        // ✅ Set secure cookie for auth
        res.cookies.set("admin-auth", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60, // 1 hour
        });

        return res;
    }

    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
}