import { NextResponse, NextRequest } from "next/server";
import { useState, useEffect } from "react";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode("538c3d37acf0995cfbd51276c0f1053d");

export function middleware(req) {
  const nextUrl = req.nextUrl;
  const path = req.nextUrl.pathname;
  const isPublicPath = path === "/admin/signin";
  const token = req.cookies.get("token")?.value;
  if (isPublicPath && token) {
    try {
      const decoded = jwtVerify(token, SECRET_KEY);
      return NextResponse.redirect(new URL("/admin/dashboard", nextUrl.origin));
    } catch (err) {
      console.error(err);
      return NextResponse.redirect(new URL("/admin/signin", nextUrl.origin));
    }
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(
      new URL(
        `/admin/signin?next=${nextUrl.pathname.split("/")[2]}`,
        nextUrl.origin
      )
    );
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};

