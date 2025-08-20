import { NextResponse } from "next/server";

export async function POST(req) {
    const { username, password } = await req.json();

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const res = NextResponse.json({ success: true });

        res.cookies.set("admin-auth", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        return res;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}