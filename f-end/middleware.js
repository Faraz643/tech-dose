import { NextResponse, NextRequest } from "next/server";
import { useState, useEffect } from "react";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode("538c3d37acf0995cfbd51276c0f1053d");

export async function middleware(req) {
  const nextUrl = req.nextUrl;
  const path = req.nextUrl.pathname;
  const isPublicPath = path === "/admin/signin"; // true or false
  const token = req.cookies.get("token")?.value;

  if (isPublicPath && token) {
    try {
      const decoded = await jwtVerify(token, SECRET_KEY);
      return NextResponse.redirect(new URL(`/admin/dashboard`, nextUrl.origin));
    } catch (err) {
      if (path !== "/admin/signin") {
        return NextResponse.redirect(new URL("/admin/signin", nextUrl.origin));
      }
    }
  } else if (!isPublicPath && token) {
    try {
      const decoded = await jwtVerify(token, SECRET_KEY);
    } catch (err) {
      if (path !== "/admin/signin") {
        return NextResponse.redirect(
          new URL(
            `/admin/signin?next=${nextUrl.pathname.split("/")[2]}`,
            nextUrl.origin
          )
        );
      }
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

/*
--  IF TOKEN_IS, AND REQUESTED PAGE IS SIGNIN, REDIRECT TO DASHBOARD HOME
-- IF !TOKEN_IS, AND REQUESTED PAGE IS SIGNIN, STAY THERE
-- IF !TOKEN, AND REQUESTED PAGE ONE OF THE ADMIN'S PAGES THEN REDIRECT TO SIGNIN,
   THEN AFTER CLICKING ON LOGIN BUTTON, REDIRECT  TO THE NEXT (THE PAGE WHICH WAS REQUESTED INITIALLY BY THE USER )

-- CHANGE THE TOKEN STRING MANUALLY AND THEN CHECK WHETHER ITS WORKING OR NOT
*/
