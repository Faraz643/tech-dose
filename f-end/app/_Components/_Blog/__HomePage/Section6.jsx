import Image from 'next/image'
import React from 'react'
import { reversedLogoBlur } from '@/public/assets/_index'
import ParentSection from './ParentSection'

const Section6 = () => {
    return (
        <ParentSection>
            <div className='w-[1200px] py-20'>
                <div className='flex flex-col justify-between items-center bg-[#060F16] p-10 rounded-[100px] max-[570px]:p-6'>
                    <h2 className='font-futureEarth text-[1.5rem] tracking-wide min-[800px]:text-6xl text-[#FFFFFF] min-[570px]:text-4xl'>MORE ON THE WAY...</h2>
                    <div className='w-[120px] max-[570px]:w-[60px]'>
                        <Image src={reversedLogoBlur} alt='Tech Dose Reversed Logo' className='mt-[-20px] max-[570px]:mt-[-15px]' />
                    </div>
                </div>
                <div className='flex justify-center p-10 px-[10%] max-[570px]:px-0'>
                    <p className='text-xl text-center'>We're not revealing all the cards just yet, but picture this: an immersive tech experience tailor-made for students like you. Think interactive tools, innovative learning resources, and opportunities that will fuel your passion for technology like never before. Get ready to embark on a new adventure with us!</p>
                </div>
            </div>
        </ParentSection>
    )
}

export default Section6