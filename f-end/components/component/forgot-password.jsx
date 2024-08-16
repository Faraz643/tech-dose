/**
 * v0 by Vercel.
 * @see https://v0.dev/t/y6MFcxCTRM3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import LiveTimer from "@/app/_Components/_Auth/LiveTimer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Send Reset Link");
  const [time, setTime] = useState(0);
  // const [validateMsg, setValidateMsg] = useState()

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

  async function handleForgotPassword(e) {
    e.preventDefault();
    const enrollValue = e.target[0].value;
    if (enrollValue.length === 0) {
      // setValidateMsg('Enter your Enrollment Id')
      notify("Enter your Enrollment Id", 1, "warn");
      e.target[0].focus();
      return;
    }
    // if (disableButton) return;
    // setDisableButton(true);
    // setButtonText('Sending Link')
    const formData = e["target"];
    const userId = formData["enrollmentId"].value;

    try {
      setIsButtonDisabled(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            enrollmentId: userId,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setIsButtonDisabled(false);
        setButtonText("Send Reset Link");
        notify(data.message, 2, "warn");
      } else {
        setButtonText("Link Sent");
        setTime(60); // Start 60 seconds countdown
        notify(data.message, 3, "success");
      }
      // setValidateMsg(data.message)
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#f0abfc] to-[#bfdbfe] px-4 dark:bg-gradient-to-br dark:from-[#18181b] dark:via-[#27272a] dark:to-[#4b5563]">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Forgot Password</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your enrollment ID to reset your password.
          </p>
        </div>
        <div className="rounded-lg bg-white/50 backdrop-blur-lg shadow-lg dark:bg-gray-900/50">
          <form className="space-y-4 p-6" onSubmit={handleForgotPassword}>
            <div className="relative">
              <Label htmlFor="enrollmentId" className="sr-only">
                Enrollment ID
              </Label>
              <Input
                id="enrollmentId"
                type="text"
                placeholder="Enter your enrollment ID"
                className="mt-1 pr-10"
              />
              <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {/* <h1>{validateMsg}</h1> */}
            <Button
              type="submit"
              className={`w-full`}
              disabled={isButtonDisabled}
            >
              {buttonText}
            </Button>
            <div className="flex justify-end">
              <Link
                href="/admin/signin"
                className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-50"
                prefetch={false}
              >
                Back to Login
              </Link>
            </div>
          </form>
          <LiveTimer
            isDisabled={isButtonDisabled}
            setIsDisabled={setIsButtonDisabled}
            setButtonText={setButtonText}
            time={time}
            setTime={setTime}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
