// using main logo + Navbar_C + SocialLink_C
'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import { tcHeaderLogo } from '@/public/assets/_index'
import Navbar from './Navbar'
import Link from 'next/link'
import SocialLink from './SocialLink'
import { ActiveNavContext } from './Contexts'

const CommonHeader = () => {
  const { active, setActive } = useContext(ActiveNavContext)
  return (
    <div className='flex justify-center px-1'>
      <div className='flex flex-row justify-between items-center px-3 bg-[#d9d9d99d] rounded-[100px] md:w-[900px]'>
        <div className='logo-wrapper p-1 pr-3'>
          <Link href='/' onClick={() => setActive('home')}>
            <Image src={tcHeaderLogo} width={45} height={40} alt='Tech Dose Logo' />
          </Link>
        </div>
        <Navbar />
        <SocialLink />
      </div>
    </div>
  )
}

export default CommonHeader