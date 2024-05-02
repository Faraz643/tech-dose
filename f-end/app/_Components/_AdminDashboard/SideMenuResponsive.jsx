'use client'
import { adminMenuLink } from '@/app/(routes)/(blog)/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const SideMenuResponsive = () => {
  const pathName = usePathname()
  const foundObject = adminMenuLink.find((e) =>
    (e.menulink === pathName)
  )
  const [activeDash, setActiveDash] = useState(foundObject.id)
  return (
    <section className='hidden  max-[810px]:block'>
      <div className='bg-blur flex gap-2  p-2 overflow-hidden rounded-[15px] menu-carousel'>
        {
          adminMenuLink.map((menu) => (
            (menu.for === pathName.split('/')[1]) &&
            <Link
              key={menu.id}
              href={menu.menulink}
              className={`px-2 ${activeDash === menu.id ? '!bg-white' : 'bg-blur !border-none'} text-center rounded-[5px] flex items-center`}
              onClick={() => {
                setActiveDash(menu.id)
              }}
            >{menu.menuName}</Link>
          ))
        }
      </div>

    </section>
  )
}

export default SideMenuResponsive