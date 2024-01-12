import Image from 'next/image'
import React from 'react'
import { reversedLogoBlur, magazineMockUp, whiteStripLine, sideUseLogo } from '@/public/assets/_index'
import SideLogo from '../SideLogo'
import ParentSection from './ParentSection'
import CommonContentLayout from './CommonContentLayout'
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
                <CommonContentLayout section='section3' />
            </div>
        </ParentSection>
    )
}

export default Section2