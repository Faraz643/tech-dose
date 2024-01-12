import React from 'react'
import { whiteStripLine } from '@/public/assets/_index'
import SideLogo from '../SideLogo'
import Image from 'next/image'
const CommonContentLayout = ({ section }) => {
    return (
        <div className="magazine-ft-content flex flex-col gap-7 justify-between my-16">
            <div>
                <h2 className='font-futureEarth text-3xl tracking-wide min-[800px]:text-6xl text-[#000000]'>
                    {
                        (section === 'section3') ?
                            (
                                <>
                                    <span className='block'>EXPLORE</span> THE LATEST TECH MARVELS  <SideLogo />
                                </>
                            ) :
                            (
                                <>
                                    <span className='block'>UNLOCK THE </span>VAULT <SideLogo /></>
                            )
                    }
                </h2>
            </div>
            <div className='min-[800px]:w-[600px]'>
                <div>
                    <Image src={whiteStripLine} alt='White Strip Line' />
                </div>
                <div>
                    {

                        (section === 'section3') ?

                            (<p className='text-xl text-center my-4 min-[800px]:text-right min-[800px]:text-[1.32rem]'>Dive into the latest tech marvels designed to inspire and empower you. From groundbreaking innovations to futuristic inventions, this space is all about showcasing how technology is shaping your world and your future.   </p>)
                            :
                            (<p className='text-xl text-center my-4 min-[800px]:text-right min-[800px]:text-[1.32rem]'>Step back in time to explore how technology has evolved to benefit you today. The vault of past editions holds the key to understanding the tech journey. </p>)

                    }
                </div>
            </div>
        </div>
    )
}

export default CommonContentLayout