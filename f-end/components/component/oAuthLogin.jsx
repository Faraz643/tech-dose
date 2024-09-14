/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HHh30XXjJNN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { tcHeaderLogo } from "@/public/assets/_index";
import Image from "next/image";
import {
  fireBaseAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "@/app/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const allowedMails = ["student.iul.ac.in"];

export default async function Component() {
  const router = useRouter();
  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(fireBaseAuth, provider);
      const user = result.user;
      if (user.email.includes(allowedMails)) {
      // if (allowedMails.includes(user.email)) {
        const checkUserExists = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/student/verify-user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firebaseId: user.uid,
            }),
            credentials: "include",
          }
        );
        const response = await checkUserExists.json();
        if (response.userExists) {
          const token = await result.user.getIdToken(); // Get the Firebase ID token
          document.cookie = `fireBaseToken=${token}; path=/`;
          router.replace("/");
        } else {
          router.replace("/student/profile-setup");
        }
      } else {
        await fireBaseAuth.signOut();
        toast.error("Please sign-in with your college id");
      }
    } catch (error) {
      console.error("Error during google sign-in", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Image
        src={tcHeaderLogo}
        height={70}
        width={70}
        alt="Tech Dose Logo Sign In"
      />
      <div>
        <div className="max-w-md w-full space-y-6 p-6 bg-card rounded-xl shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Google Sign-In
            </h1>
            <p className="text-muted-foreground">
              Sign in with your college mail id to register for campus events.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 w-full bg-[#242424] text-white"
          >
            <ChromeIcon className="h-4 w-4" />
            Sign in with Google
          </Button>
        </div>
      </div>
      <ToastContainer
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeOnClick
        position="top-right"
      />
    </div>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
