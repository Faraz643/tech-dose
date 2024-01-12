import Image from 'next/image'
import React from 'react'
import SideLogo from '../SideLogo'
import ParentSection from './ParentSection'
import { blackStripLine } from '@/public/assets/_index'
import StackImagesCard from './StackImagesCard'
const Section5 = () => {
    return (
        <ParentSection>
            <div className='w-[1200px]'>
                <div className='flex justify-end'>
                    <h2 className='font-futureEarth text-right text-3xl text-[#000000] tracking-wide min-[800px]:text-6xl  min-[570px]:text-4xl'>
                        <span className='block'>LEADING </span><span className='block'>TOMORROW'S  </span><SideLogo />TECH, TODAY</h2>
                </div>
                <div className='flex flex-col bg-[#060F16] rounded-[40px] min-h-[300px] w-auto pb-12 pt-[3rem] mt-10  px-4 py-8 min-[970px]:flex-row min-[970px]:justify-around min-[970px]:items-center min-[970px]:pt-[6rem]'>
                    <div className='flex flex-col min-[970px]:w-[600px]'>
                        <Image src={blackStripLine} alt='Black Strip Line' className='order-2 min-[970px]:order-1' />
                        <div className='order-1 min-[970px]:order-2'>
                            <p className='text-xl text-center my-4 min-[800px]:text-left min-[800px]:text-[1.32rem] text-[#FFFFFF] '>Stay ahead of the curve! Dive into insightful trends and gain valuable tech insights. Learn about the trends that will impact your career, your studies, and your life. Arm yourself with the knowledge that gives you an edge</p>
                        </div>
                    </div>
                    <div className='self-end max-[969px]:self-center max-[969px]:mt-[100px]'>
                        <StackImagesCard />
                    </div>
                </div>
            </div>
        </ParentSection>
    )
}

export default Section5