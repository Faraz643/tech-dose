import { NextResponse, NextRequest } from "next/server";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

const SECRET_KEY = "538c3d37acf0995cfbd51276c0f1053d";

export function middleware(req) {
  const nextUrl = req.nextUrl;
  const token = req.cookies.get("token");
  console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify("token", SECRET_KEY);
      const userId = decoded.enrollmentId;
      return NextResponse.next();
    } catch (err) {
      console.error(err);
      return NextResponse.redirect(new URL("/admin/sign-in", nextUrl.origin));
    }
  } else {
    return NextResponse.redirect(new URL("/admin/sign-in", nextUrl.origin));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
