import { NextResponse, NextRequest } from "next/server";
import { useState, useEffect } from "react";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY);

// Utility function to validate token
async function validateToken(token) {
  try {
    const decoded = await jwtVerify(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    return null;
  }
}

export async function middleware(req) {
  const {
    nextUrl: { pathname, origin },
    cookies,
  } = req;
  const token = cookies.get("token")?.value;

  // Paths for admin and student areas
  const isAdminPath = pathname.startsWith("/admin");
  const isStudentPath = pathname.startsWith("/student");

  if (isAdminPath) {
    // Middleware logic for admin
    const publicAdminPaths = [
      "/admin/signin",
      "/admin/signup",
      "/admin/forgot-password",
    ];
    const isPublicAdminPath = publicAdminPaths.includes(pathname);

    if (isPublicAdminPath && token) {
      const decoded = await validateToken(token);
      if (decoded) {
        return NextResponse.redirect(new URL("/admin/dashboard", origin));
      }
    } else if (!isPublicAdminPath) {
      if (token) {
        const decoded = await validateToken(token);
        if (!decoded) {
          return NextResponse.redirect(
            new URL(`/admin/signin?next=${pathname.split("/")[2]}`, origin)
          );
        }
      } else {
        return NextResponse.redirect(
          new URL(`/admin/signin?next=${pathname.split("/")[2]}`, origin)
        );
      }
    }
  }

  if (isStudentPath) {
    // Middleware logic for students
    const publicStudentPaths = ["/student/open-auth"];
    const isPublicStudentPath = publicStudentPaths.includes(pathname);

    if (isPublicStudentPath && token) {
      const decoded = await validateToken(token);
      if (decoded) {
        return NextResponse.redirect(new URL("/", origin));
      }
    } else if (!isPublicStudentPath) {
      if (token) {
        const decoded = await validateToken(token);
        if (!decoded) {
          return NextResponse.redirect(
            new URL(`/student/open-auth?next=${pathname.split("/")[2]}`, origin)
          );
        }
      } else {
        return NextResponse.redirect(
          new URL(`/student/open-auth?next=${pathname.split("/")[2]}`, origin)
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path((?!reset-password$|verify-account$|reset-password/[^/]+$|verify-account/[^/]+$).*)",
  ],
};
