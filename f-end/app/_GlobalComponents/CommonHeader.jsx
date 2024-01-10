// using main logo + Navbar_C + SocialLink_C
import React from 'react'
import Image from 'next/image'
import { tcHeaderLogo } from '@/public/assets/_index'
import Navbar from './Navbar'
import Link from 'next/link'
import SocialLink from './SocialLink'

const CommonHeader = () => {
  return (
    <div className='flex justify-center px-1'>
      <div className='flex flex-row justify-between items-center px-3 bg-[#D9D9D9] rounded-[100px] md:w-[900px]'>
        <div className='logo-wrapper p-1 pr-3'>
          <Link href='/blog'>
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