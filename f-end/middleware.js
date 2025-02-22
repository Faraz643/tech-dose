import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getFirebaseAuth } from "next-firebase-auth-edge";


// Utility function to validate token
const { verifyIdToken } = getFirebaseAuth({
  serviceAccount: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  apiKey: process.env.FIREBASE_PRIVATE_KEY,
});


const SECRET_KEY = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY);

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
  const fireBaseToken = cookies.get("fireBaseToken")?.value;
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

  if (isStudentPath && fireBaseToken) {
    // Middleware logic for students
    // console.log("token", verifyIdToken(fireBaseToken));

    try {
      const decodedToken = await verifyIdToken(fireBaseToken);
      // console.log(decodedToken);
      return NextResponse.redirect(new URL("/", origin));
    } catch (error) {
      // console.log(error);
      return NextResponse.next(new URL("/admin/signin", origin));
    }
  }
}

export const config = {
  matcher: [
    "/admin/:path((?!reset-password$|verify-account$|reset-password/[^/]+$|verify-account/[^/]+$).*)",
    "/student/:path*",
  ],
};
