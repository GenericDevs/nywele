// lib/auth.js
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export function login(token) {
    setCookie("auth_token", token, { maxAge: 60 * 60 }); // 1 hour
}

export function logout() {
    deleteCookie("auth_token");
}

export function isAuthenticated() {
    const token = getCookie("auth_token");
    if (!token) return false;

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return true;
    } catch {
        return false;
    }
}