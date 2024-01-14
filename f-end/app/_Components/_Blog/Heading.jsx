'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'


const Heading = ({ elementFor }) => {
    const pathName = usePathname()
    return (
        <div className={`pt-7 pb-4 ${pathName != elementFor ? 'hidden' : 'block'}`} >
            <h3 className='font-futureEarth text-[1.5rem] tracking-wide min-[800px]:text-7xl text-[#f8f8f8] min-[570px]:text-4xl text-center'>TECH DOSE</h3>
        </div>
    )
}

export default Heading