import Image from 'next/image'
import React from 'react'
import SideMenuLinks from './SideMenuLinks'
import { tcHeaderLogo } from '@/public/assets/_index'



const SideMenu = () => {
  return (
    <aside className='bg-blur flex justify-evenly flex-col gap-20 items-center rounded-[25px] w-[300px] py-2 max-[810px]:hidden'>
      <div>
        <Image src={tcHeaderLogo} width={60} />
      </div>
      <div>
        <SideMenuLinks />
      </div>
      <div>
        <h2 className='text-[1.25rem] text-white font-futureEarth tracking-widest'>Tech Dose</h2>
      </div>
    </aside>
  )
}

export default SideMenu