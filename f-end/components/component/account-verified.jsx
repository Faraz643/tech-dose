/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Wy2XV46yemb
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function VerifyAccount() {

    const [tokenVerifyResponse, setTokenVerifyResponse] = useState('loading')
    const { token } = useParams()
    const router = useRouter()

    useEffect(() => {
        async function validateToken() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/verify-account/${token}`, { method: 'GET' })
            if (!response.ok) {
                router.replace('/admin/signin')
            } else {
                setTokenVerifyResponse('OK')
            }
        }
        validateToken()
    }, [token])

    if (tokenVerifyResponse === 'loading') {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#fcd1ab] to-[#bfdbfe] px-4 dark:bg-gradient-to-br dark:from-[#18181b] dark:via-[#27272a] dark:to-[#4b5563]">
            <div className="w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <CircleCheckIcon className="mx-auto h-16 w-16 text-green-500" />
                    <h1 className="text-3xl font-bold tracking-tight">Account Verified</h1>
                    <p className="text-gray-500 dark:text-gray-400">Your account has been successfully verified.</p>
                </div>
                <div className="rounded-lg bg-white/50 backdrop-blur-lg shadow-lg dark:bg-gray-900/50">
                    <div className="space-y-4 p-6">
                        <div className="grid gap-2">
                            <div className="font-semibold">Email Verified</div>
                            <div className="text-gray-500 dark:text-gray-400">Your email address has been successfully verified.</div>
                        </div>
                        <div className="grid gap-2">
                            <div className="font-semibold">Phone Verified</div>
                            <div className="text-gray-500 dark:text-gray-400">Your phone number has been successfully verified.</div>
                        </div>
                        <div className="grid gap-2">
                            <div className="font-semibold">Identity Verified</div>
                            <div className="text-gray-500 dark:text-gray-400">Your identity has been successfully verified.</div>
                        </div>
                        <Button type="submit" className="w-full">
                            Continue to Dashboard
                        </Button>
                        <div className="flex justify-end">
                            <Link
                                href="#"
                                className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-50"
                                prefetch={false}
                            >
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CircleCheckIcon(props) {
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
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}