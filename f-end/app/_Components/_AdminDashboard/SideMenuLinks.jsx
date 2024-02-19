'use client'

import React, { useState } from 'react'
import { adminMenuLink } from '../../(routes)/(blog)/utils'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'


const SideMenuLinks = () => {
    const pathName = usePathname()
    const foundObject = adminMenuLink.find((e) =>
        (e.menulink === pathName)
    )
    const [activeDash, setActiveDash] = useState(foundObject.id)



    return (
        <div className='flex flex-col gap-10'>

            {
                adminMenuLink.map((links) => (
                    <Link key={links.id} href={links.menulink}
                        className={` !border-none p-2 text-center text-lg rounded-[20px] flex gap-2 items-center ${activeDash === links.id ? '!bg-white' : 'bg-blur'} hover:bg-[#ffffff90] duration-100`} onClick={() => {
                            setActiveDash(links.id)
                        }}>
                        <span>
                            <Image src={links.menuIcon} width={25} alt={links.menuName} />
                        </span>
                        {links.menuName}
                    </Link>
                ))
            }

        </div>
    )
}

export default SideMenuLinks