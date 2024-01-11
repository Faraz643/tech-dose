import React from 'react'
import ParentSection from './ParentSection'
import { blackStripLine } from '@/public/assets/_index'
import SideLogo from '../SideLogo'
import Image from 'next/image'
const Section3 = () => {
    return (
        <ParentSection>

            <div className='monthly-features w-[1200px]'>
                <div className='bg-[#060F16] rounded-[25px] min-h-[250px] w-auto relative py-20 pt-28'>
                    <div className='absolute top-[-50px] left-12'>
                        {/* stack images */}
                    </div>
                    <div className="flex flex-col gap-6 justify-center px-4 min-[970px]:flex-row min-[970px]:justify-between">
                        <div className='min-[970px]:order-2'>
                            <h2 className='font-futureEarth text-right text-3xl tracking-wide min-[800px]:text-6xl text-[#FFFFFF] min-[570px]:text-4xl'>
                                <span className='block'>DIVE INTO OUR </span> <span className='block'>MONTHLY TECH </span><SideLogo /> CHRONICLES</h2>
                        </div>
                        <div className="flex flex-col min-[970px]:order-1 min-[970px]:w-[400px] min-[970px]:gap-10">
                            <Image src={blackStripLine} alt='Black Strip Line' />
                            <div className=''>
                                <p className='text-xl text-center my-4 min-[800px]:text-right min-[800px]:text-[1.32rem] text-[#FFFFFF]'>Get ready for a thrilling journey through the exciting world of tech! Our monthly tech chronicles offer insights, stories, and ideas that matter to you. Learn about new trends, and get equipped with knowledge that empowers your ambitions.   </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </ParentSection>
    )
}

export default Section3