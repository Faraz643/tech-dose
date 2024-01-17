// using nav tag for creating navbar\
'use client'
import { navLinks } from '../../(routes)/(blog)/utils'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { ActiveNavContext } from './Contexts'



const Navbar = () => {
    const { active, setActive } = useContext(ActiveNavContext)
    return (

        <nav>
            <ul className='flex flex-row bg-[#dd2f2f00] gap-10 max-[570px]:py-1 max-[570px]:gap-2'>
                {
                    navLinks.map((navLink) => (
                        <Link key={navLink.id}
                            href={navLink.link}
                            className={`navlinks flex items-center gap-2 ${active === navLink.id ? 'bg-[#E1FF4A]' : 'bg-[#FBFBFB]'}  py-2 px-4 rounded-[100px] border-solid border-[black] md:border-0 max-[570px]:flex-col max-[570px]:gap-0 max-[570px]:px-[1] max-[570px]:rounded-[30px] max-[570px]:py-1 duration-100 ${!(active === navLink.id) && 'hover:bg-[#eeeded]'}`}
                            onClick={() => {
                                setActive(navLink.id);
                                if (navLink.id === 'home') {

                                    document.body.style.backgroundColor = '#201F1E'
                                } else if (navLink.id === 'blog') {
                                    document.body.style.backgroundColor = '#ECECEC'

                                }
                            }}
                        >
                            <span className='hidden-item max-[570px]:text-xs max-[570px]:order-2'>{navLink.title}</span>
                            <li className='w-[21px] h-[18px] max-[570px]:h-[14px] max-[570px]:w-[14px] '>
                                <Image src={navLink.icon}

                                    alt={navLink.title} />
                            </li>
                        </Link>
                    ))
                }
            </ul>

        </nav>

    )
}

export default Navbar