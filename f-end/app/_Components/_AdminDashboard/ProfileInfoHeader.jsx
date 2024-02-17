'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { greeting } from '@/public/assets/_index'
import { userProfile, logout, setting } from '@/public/assets/_index'
import UserProfileOptions from './UserProfileOptions'

const ProfileInfoHeader = () => {

  const [profileOptions, setProfileOptions] = useState('hide')

  function toggleProfileOptions() {
    setProfileOptions(profileOptions === 'hide' ? 'show' : 'hide')
  }

  return (
    <section>
      <div className='bg-blur h-[100px] rounded-[25px]'>
        <div className='h-[100%] w-full flex justify-between p-5 items-center'>
          <div className='flex gap-2'>
            <span className='text-black text-[1.3rem]'>Welcome, Dane Ronny</span>
            <span>
              <Image src={greeting} width={30} />
            </span>
          </div>
          <div className='relative'>
            <div className='rounded-full border-[1.5px] border-black bg-black overflow-hidden'>
              <Image src={userProfile} width={80} className='object-cover hover:cursor-pointer' alt='User Profile Picture' onClick={toggleProfileOptions} />
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