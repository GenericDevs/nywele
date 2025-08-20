import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ success: true });

    res.cookies.set("admin-auth", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
    });

    return res;
}