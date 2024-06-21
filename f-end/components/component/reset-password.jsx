/**
 * v0 by Vercel.
 * @see https://v0.dev/t/8u51RjzmrKp
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function ResetPassword() {

    const [passErr, setPassErr] = useState()
    const [successMsg, setSuccessMsg] = useState()
    const { token } = useParams()
    const router = useRouter()

    useEffect(() => {
        async function verifyToken() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/reset-password/${token}`, {
                method: 'GET',
            })
            if (!response.ok) {
                router.replace('/admin/signin')
            }
        }
        verifyToken()
    }, [token])

    async function handleResetPassword(e) {
        e.preventDefault()
        const formData = e['target']
        const newPass = formData['newPassword'].value
        const confirmPass = formData['confirmPassword'].value
        // if (newPass.length === 0) {
        //     setPassErr('Please enter a password first')
        // }
        // else if (confirmPass.length === 0) {
        //     setPassErr('Please confirm your password')
        // }
        // else if (newPass != confirmPass) {
        //     setPassErr('New Password and Confirm Password must be same')
        // }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    newPassword: newPass,
                    confirmPassword: confirmPass
                })
            })
            const data = await response.json()
            if (!response.ok) {
                // console.log(data.message)
                setPassErr(data.message)
            } else if (response.ok) {

                setSuccessMsg('Your Password has been updated successfully, you will be redirected to sign-in page shortly')
                formData['newPassword'].value = ''
                formData['confirmPassword'].value = ''
                setPassErr()
                setTimeout(() => {
                    router.push('/admin/signin')
                }, 3000);
            }
        } catch (err) {
            console.error('An error occured while updating your password')
        }
    }


    return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#f0abfc] to-[#bfdbfe] px-4 dark:bg-gradient-to-br dark:from-[#18181b] dark:via-[#27272a] dark:to-[#4b5563]">
            <div className="w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-[green]">{successMsg}</h1>
                    <h1 className="text-3xl font-bold tracking-tight">Reset Password</h1>
                    <p className="text-gray-500 dark:text-gray-400">Enter your new password to reset your account.</p>
                </div>
                <div className="rounded-lg bg-white/50 backdrop-blur-lg shadow-lg dark:bg-gray-900/50">
                    <form className="space-y-4 p-6" onSubmit={handleResetPassword}>
                        <div className="relative">
                            <Label htmlFor="newPassword" className="sr-only">
                                New Password
                            </Label>
                            <Input id="newPassword" type="password" placeholder="Enter new password" className="mt-1 pr-10" />
                            <LockIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        <div className="relative">
                            <Label htmlFor="confirmPassword" className="sr-only">
                                Confirm Password
                            </Label>
                            <Input id="confirmPassword" type="password" placeholder="Confirm new password" className="mt-1 pr-10" />
                            <LockIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        <div className="text-red-500">{passErr}</div>
                        <Button type="submit" className="w-full">
                            Update Password
                        </Button>
                        <div className="flex justify-end">
                            <Link
                                href="/admin/signin"
                                className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-50"
                            // prefetch={false}
                            >
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

function LockIcon(props) {
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
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    )
}