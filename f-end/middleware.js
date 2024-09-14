import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getFirebaseAuth } from "next-firebase-auth-edge";

console.log(typeof process.env.FIREBASE_CLIENT_EMAIL);
console.log(typeof process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"));
console.log(typeof process.env.FIREBASE_PROJECT_ID);

// Utility function to validate token
const { verifyIdToken } = getFirebaseAuth({
  serviceAccount: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  apiKey: process.env.FIREBASE_PRIVATE_KEY,
});










// const { verifyIdToken } = getFirebaseAuth({
//   serviceAccount: {
//     projectId: "tech-dose-images",
//     clientEmail: "firebase-adminsdk-wjajv@tech-dose-images.iam.gserviceaccount.com",
//     privateKey: `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDmBIv4xiQ4dgsZ\npyGST0M5DWRWoPeV0IK32RPy2Xj4mIIMbqCDqC4n55ghL/2bJIvrR5tpVRTfCzyJ\nDaS10tUAC/dw1QDdPdxOnD4XHPFuzO6Fj9x41op5SFujz21lbWwMexjRIcesNZR7\nLpl01eEv0wjvt1q1mE0OSKZfLvP3/VKLr+hY1PeFT/yngL0lcuFnFHtAYs8qJKFh\n1zxxm5qgQTnnX/+7TaYwXKQp4Z3ULnZx7zLFaaSUjvRpP8o5X19UbDPaYDbSJ3+l\nUC/mpzk2S1yTb4yUw+AvzPRwnsdVA+FKN8X7sLDqIsVXd9/xU16jBrr/eduKcwsp\ntUlL9rrDAgMBAAECggEAFSzopee31erSwsh8HWK7/DibZXjpfMVMA24x7p15YYlz\nZNRFEAR08KowJdNWiZMnvmqX3W6TvqTjgcqGa1FpgoOXgq+upgTX5J9wUo27kZ5p\nfFTuJcG6ex003TPEt8hcYMRvAxxqVr7oAx8bHtfBz2FM5U9VQ8/YPYRlV0Xp995m\n+fnogft7UZ0Dp0KLBufU+ebWC+Mem239nRMeRKs4KOjVVQzQ2oMN//mtNR5k989E\n+OA4asyYoecyf3SSKdSalyFm1U74IKZr92F5utDpsS+qdaiN+KiQkbyV/ZXwHkDz\nQARmdoWWqUM/EzxYJy3lkXjTXg7rjPTLqw6KwEAu4QKBgQD85G/IDC9R0wNbLpZN\nbEfU1I1QWOwigoA4iTcTnHc+WWm1gkYiJ/kRIfPRYo7bQnP7RZE6r3f6PAsfvx7+\nXsk2lHtV/ilkZ52gDiFoH4LiMrdUf9MPT0OwlOZo5rM/WSSBqvoVhD/iCUhUJ99/\nMyWA4ICgfRj9ZSMXrEtTDXiQXQKBgQDo2CZkefa4UdNWcVrPRdxqWyZB7XezOPT7\n7FbPZa79Vs9x7aM0VTckSagi/vP3NAfmCVp2kk77JDDRnDGWO36bNiAi4R3BSkvI\n8NlOPkn/O/toiWKEH0MIhwzqChCD5wH9bJCitUZFOXs2eCYCkQCTKi4YLjYkaqh2\nv8uW6RxFnwKBgB9CiYK75tmBcOfDgXa+jL6FK5aj90Roxzq102YMMD03xjZWjR7J\nvCLfBIl8WlZGB5omxkXvzK/U3jclY8pjoxGpFvnROgKcQEK5nG2Hf6FATaMXTdqV\nnLNmJHkRE1UgSr/wh4tDVrY1GYi1iQ3rH5anqZ6s9/rSlpzlgkYY4y9NAoGAY8hF\nY6eUoFaIf7HiHZMtqvJWycfvFQHikpcseIJ15CEwkv0ohIPENqvN/vlNKXHFtMHr\nX4bBjARtW1ZZNa1XS0J9sRTRwISLR5hXN52f7l4RFjJR4pbXDi95zE311+DGTIka\nzm9qpr3EXIpOl6j2GxrnV/ttvltqyEDXCVvqfrcCgYEAm9OLQ494pT2DXix36lUa\nxm8WNVXsOYjcJgtJOXQ1cnYOG8vPGbkaamLprcqi+WhvdRvY30nMUEJqL4EvE5Sd\nAMmEskmuxO2GTOe0SJLNDXEwD+EPlHiHX6sp931IK0Jy4rSyqlluzpC5ksahmgpP\nQ/xa+NSd1kUTc9P0xeEahyk=\n-----END PRIVATE KEY-----\n`,
//   },
//   apiKey: "AIzaSyAH1_axiE7RCq4VEtVPpSwIG_kJDrSBPlI",
// });










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
