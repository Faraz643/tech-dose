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
  const { setActive } = useContext(ActiveNavContext)
  return (
    <div className='flex justify-center px-1'>
      <div className='flex flex-row justify-between items-center px-3 bg-[#c6c3c3b8] rounded-[100px] md:w-[900px]'>
        <div className='logo-wrapper p-1 pr-3'>
          <Link href='/' onClick={
            () => {
              setActive('home')
              document.body.style.backgroundColor = '#201F1E'
            }
          }>
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