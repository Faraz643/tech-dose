import { NextResponse, NextRequest } from "next/server";
import { useState, useEffect } from "react";
// import jwtVerify from "jose";
import { jwtVerify } from "jose";

const SECRET_KEY = "538c3d37acf0995cfbd51276c0f1053d";

export function middleware(req) {
  const nextUrl = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  if (token) {
    try {
      const decoded = jwtVerify(token, SECRET_KEY);
      const userId = decoded.enrollmentId;
      return NextResponse.redirect(new URL("/admin/dashboard", req.url.origin));

      // NextResponse.next();
    } catch (err) {
      console.error(err);
      return NextResponse.redirect(new URL("/admin/signin", nextUrl.origin));
    }
  } else {
    return NextResponse.redirect(new URL("/admin/signin", nextUrl.origin));
  }
}

export const config = {
  matcher: ["/admin/((?!signin).*)"],
};
