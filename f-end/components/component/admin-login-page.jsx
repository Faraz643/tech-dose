/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/oboMECyC568
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Router } from "next/router";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export function AdminLoginPage() {
  const [inputWarning, setInputWarning] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/dashboard";

  async function handleLogin(e) {
    e.preventDefault();
    setInputWarning("");
    const formData = e["target"];
    const userId = formData["enrollmentId"].value;
    const userPass = formData["password"].value;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/sign-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            enrollmentId: userId,
            password: userPass,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setInputWarning(data.message);
      } else if (response.ok) {
        // document.cookie = "token" + "=" + (data.authToken || "");
        document.cookie = `token=${data.authToken}`;
        router.replace(`/admin/${nextUrl}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#f0abfc] to-[#bfdbfe] px-4 dark:bg-gradient-to-br dark:from-[#18181b] dark:via-[#27272a] dark:to-[#4b5563]">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your enrollment ID and password to sign in.
          </p>
        </div>
        <div className="rounded-lg bg-white/50 backdrop-blur-lg shadow-lg dark:bg-gray-900/50">
          <form className="space-y-4 p-6" onSubmit={handleLogin}>
            <p className="text-[#d42525] text-center">{inputWarning}</p>
            <div className="relative">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                htmlFor="enrollmentId"
              >
                Enrollment ID
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 pr-10"
                id="enrollmentId"
                placeholder="Enter your enrollment ID"
                type="text"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute right-3 top-1/2  h-5 w-5 text-gray-400"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="relative">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 pr-10"
                id="password"
                placeholder="Enter your password"
                type="password"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute right-3 top-1/2  h-5 w-5 text-gray-400"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              type="submit"
            >
              Login
            </button>
            <div className="flex justify-end">
              <Link
                href="/admin/forgot-password"
                className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-50"
                prefetch={false}
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
