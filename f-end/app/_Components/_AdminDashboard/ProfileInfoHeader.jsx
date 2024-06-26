'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { greeting, tcHeaderLogo } from '@/public/assets/_index'
import { userProfile, logout, setting } from '@/public/assets/_index'
import UserProfileOptions from './UserProfileOptions'

const ProfileInfoHeader = () => {

  const [profileOptions, setProfileOptions] = useState('hide')

  function toggleProfileOptions() {
    setProfileOptions(profileOptions === 'hide' ? 'show' : 'hide')
  }

  return (
    <section className='z-[999]'>
      <div className='bg-blur h-[80px] rounded-[25px]'>
        <div className='h-[100%] w-full flex justify-between p-5 items-center max-[500px]:p-1'>
          <span className='min-[810px]:hidden'>
          <Image src={tcHeaderLogo} width={40} alt='Tech Dose logo'/>
          </span>
          <div className='flex gap-2'>
            <span className='text-black text-[1.3rem] max-[500px]:text-[1.1rem]'>Welcome, Faraz Rasool</span>
            <span>
              <Image src={greeting} width={25} alt='Hello {user_name}'/>
            </span>
          </div>
          <div className='relative'>
            <div className='rounded-full border-[1.5px] border-black bg-black overflow-hidden'>
              <Image src={userProfile} width={50} className='object-cover hover:cursor-pointer' alt='User Profile Picture' onClick={toggleProfileOptions} />
            </div>
            {
              profileOptions === 'show' &&
              <UserProfileOptions />
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileInfoHeader