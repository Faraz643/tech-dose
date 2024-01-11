import Image from 'next/image'
import React from 'react'
import { reversedLogoBlur, magazineMockUp, whiteStripLine, sideUseLogo } from '@/public/assets/_index'
import SideLogo from '../SideLogo'
import ParentSection from './ParentSection'
const Section2 = () => {
    return (
        <ParentSection>
            <div className='magazine-feature w-[1200px] pt-16'>
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
                        <h2 className='font-futureEarth text-3xl tracking-wide min-[800px]:text-6xl text-[#000000]'>
                            <span className='block'>EXPLORE</span>THE LATEST TECH MARVELS<SideLogo /></h2>
                    </div>
                    <div className='min-[800px]:w-[600px]'>
                        <div>
                            <Image src={whiteStripLine} alt='White Strip Line' />
                        </div>
                        <div>
                            <p className='text-xl text-center my-4 min-[800px]:text-right min-[800px]:text-[1.32rem]'>Dive into the latest tech marvels designed to inspire and empower you. From groundbreaking innovations to futuristic inventions, this space is all about showcasing how technology is shaping your world and your future.   </p>
                        </div>
                    </div>
                </div>
            </div>
        </ParentSection>
    )
}

export default Section2