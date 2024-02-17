import React from 'react'
import { logout, setting } from '@/public/assets/_index'
import Image from 'next/image'


const UserProfileOptions = () => {
    return (
        <div className='absolute flex flex-col gap-2 items-center ml-[30%] mt-[15%] bg-white rounded-full p-1 z-[999]'>
            <Image src={setting} width={30} className='object-cover hover:cursor-pointer' alt='User Profile Picture' />
            <Image src={logout} width={30} className='object-cover hover:cursor-pointer' alt='User Profile Picture' />
        </div>
    )
}

export default UserProfileOptions