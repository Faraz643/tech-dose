import Image from 'next/image'
import React from 'react'
import { reversedLogoBlur, magazineMockUp, whiteStripLine, sideUseLogo } from '@/public/assets/_index'
import SideLogo from '../SideLogo'
const Section2 = () => {
    return (
        <section className='magazine-feature max-[1280px]:w-[90%] w-[1200px] py-28 '>
            <div className="magazine-ft-wrapper flex justify-between items-center pl-32 rounded-[300px] bg-[#040D12] h-[350px]">
                <div className='logo'>
                    <Image src={reversedLogoBlur} alt='Feature Logo' />
                </div>
                <div className='magazines-photo-wrapper'>
                    <Image src={magazineMockUp} alt='Magazine Mockup' className='magazines-photo' />
                </div>
            </div>
            <div className="magazine-ft-content flex flex-col gap-7 justify-between my-20">
                <div>
                    <h2 className='font-futureEarth text-3xl tracking-wide min-[800px]:text-5xl'>
                        <span className='block'>EXPLORE</span>  THE LATEST TECH MARVELS<SideLogo /></h2>
                </div>
                <div className='min-[800px]:w-[600px]'>
                    <div>
                        <Image src={whiteStripLine} alt='Strip Line' />
                    </div>
                    <div>
                        <p className='text-xl text-center my-4 min-[800px]:text-right min-[800px]:text-[1.32rem]'>Dive into the latest tech marvels designed to inspire and empower you. From groundbreaking innovations to futuristic inventions, this space is all about showcasing how technology is shaping your world and your future.   </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section2