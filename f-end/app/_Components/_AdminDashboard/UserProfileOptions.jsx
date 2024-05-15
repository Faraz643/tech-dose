'use client'
import React from 'react'
import { logout, setting } from '@/public/assets/_index'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const UserProfileOptions = () => {
    const router = useRouter()

    async function handleLogout() {
        try {
            const response = await fetch('http://localhost:3001/api/auth/sign-out', {
                method: 'POST',
                credentials: 'include'
            },
            )
            if (!response.ok) {
                console.log('Error logging out')
            }
            router.replace('/admin/signin')

        } catch (err) {
            console.error('Inter server error', err)
        }


    }

    return (
        <div className='absolute flex flex-col gap-2 items-center ml-[25%] mt-[15%] bg-white rounded-full p-1'>
            <Image src={setting} width={30} className='object-cover hover:cursor-pointer' alt='User Profile Picture' />
            <Image src={logout} width={30} className='object-cover hover:cursor-pointer' alt='User Log Out' onClick={handleLogout} />
        </div>

    )
}

export default UserProfileOptions