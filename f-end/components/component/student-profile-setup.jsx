/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/oboMECyC568
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import LiveTimer from "@/app/_Components/_Auth/LiveTimer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fireBaseAuth } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export function StudentProfileSetup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [firebaseId, setfirebaseId] = useState("");
  const router = useRouter();
  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(fireBaseAuth, (user) => {
      if (user) {
        // Set user name and email if the user is logged in
        setName(user.displayName);
        setEmail(user.email);
        setfirebaseId(user.uid);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Call this function when your page loads
  const [time, setTime] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Send Reset Link");

  function notify(message, id, status) {
    const toastInfo = {
      toastId: id,
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: false,
    };
    if (status === "warn") {
      toast.warn(message, toastInfo);
    } else if (status === "success") {
      toast.success(message, toastInfo);
    }
  }
  async function handleCreateAccount(e) {
    e.preventDefault();
    // if (disableButton) return;
    // setDisableButton(true);

    const formData = e["target"];
    const userName = name;
    const userID = formData["enrollmentId"].value;
    const userMail = email;
    const userBranch = formData["branch"].value;
    const userYear = formData["year"].value;

    if (
      userID.length === 0 ||
      userBranch.length === 0 ||
      userYear.length === 0 ||
      typeof userName !== "string" ||
      isNaN(Number(userID)) ||
      isNaN(Number(userYear))
    ) {
      notify("Please fill appropriate values in each field", 1, "warn");
      return;
    }

    try {
      setIsButtonDisabled(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/student/setup-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: userName,
            enrollmentId: userID,
            email: userMail,
            branch: userBranch,
            year: userYear,
            firebaseId: firebaseId,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        notify(data.message, 1, "success");
        router.replace("/events");
        setTime(60);
      } else {
        setIsButtonDisabled(false);
        notify(data.message, 1, "warn");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#fcd1ab] to-[#bfdbfe] px-4 dark:bg-gradient-to-br dark:from-[#18181b] dark:via-[#27272a] dark:to-[#4b5563]">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Create A New Account
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your credentials to sign up.
          </p>
        </div>
        <div className="rounded-lg bg-white/50 backdrop-blur-lg shadow-lg dark:bg-gray-900/50">
          <form
            className="space-y-4 p-6"
            method="POST"
            onSubmit={handleCreateAccount}
          >
            {/* <div className="relative">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 pr-10"
                id="name"
                placeholder="What do people call you at Integral ?"
                type="text"
                autoComplete="current-name"
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
                className="absolute right-3 top-1/2 h-5 w-5 text-gray-400"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div> */}
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
                autoComplete="current-enrollId"
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
                className="absolute right-3 top-1/2 h-5 w-5 text-gray-400"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              </svg>
            </div>
            {/* <div className="relative">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 pr-10"
                id="email"
                placeholder="Enter your university email"
                type="email"
                autoComplete="current-email"
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
                className="absolute right-3 top-1/2 h-5 w-5 text-gray-400"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div> */}
            <div className="relative">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                htmlFor="branch"
              >
                Branch
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 pr-10"
                id="branch"
                placeholder="What do you study ?"
                type="text"
                autoComplete="current-branch"
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
                className="absolute right-3 top-1/2 h-5 w-5 text-gray-400"
              >
                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                <rect width="20" height="14" x="2" y="6" rx="2" />
              </svg>
            </div>
            <div className="relative">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                htmlFor="year"
              >
                Year
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 pr-10"
                id="year"
                placeholder="What year are you in ?"
                type="text"
                autoComplete="current-year"
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
                className="absolute right-3 top-1/2 h-5 w-5 text-gray-400"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
            </div>
            {/* <div className="relative">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 pr-10"
                id="password"
                placeholder="Create a Hulk-like password"
                type="password"
                autoComplete="current-password"
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
                className="absolute right-3 top-1/2 h-5 w-5 text-gray-400"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div> */}
            <input
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full hover:cursor-pointer`}
              type="submit"
              value="Count Me In !"
              disabled={isButtonDisabled}
            />
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}