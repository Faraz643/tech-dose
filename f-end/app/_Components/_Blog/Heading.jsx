'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'


const Heading = ({ headingFor, color='#f8f8f8' }) => {
    const pathName = usePathname()
    return (
        <div className={`pt-7 pb-4 ${pathName != headingFor ? 'hidden' : 'block'}`} >
            <h3 className={`font-futureEarth text-[2rem] tracking-wide min-[800px]:text-7xl text-[${color}] min-[570px]:text-4xl text-center`}>TECH DOSE</h3>
        </div>
    )
}

export default Heading