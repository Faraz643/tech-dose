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
            <ul className='flex flex-row bg-[#dd2f2f00] gap-5'>
                {
                    navLinks.map((navLink) => (
                        <Link key={navLink.id}
                            href={navLink.link}
                            className={`navlinks flex items-center gap-2 ${active === navLink.id ? 'bg-[#E1FF4A]' : 'bg-[#FBFBFB]'}  py-2 px-4 rounded-[100px] border-solid border-[black] md:border-0`}
                            onClick={() => {
                                setActive(navLink.id);
                                if (navLink.id === 'home') {

                                    document.body.style.backgroundColor = '#201F1E'
                                } else if (navLink.id === 'blog') {
                                    document.body.style.backgroundColor = '#ECECEC'

                                }
                            }}
                        >
                            <span className='hidden-items'>{navLink.title}</span>
                            <li>
                                <Image src={navLink.icon}
                                    width={21}
                                    height={18}
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