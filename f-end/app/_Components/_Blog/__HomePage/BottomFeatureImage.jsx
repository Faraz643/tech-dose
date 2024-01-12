import React from 'react'
import { secondFtMainImg } from '@/public/assets/_index'
import Image from 'next/image'


const BottomFeatureImage = () => {
    return (
        <div className='relative bottom-feature-image  overflow-hidden border-[6px] max-[450px]:border-[6px] rounded-[100px]'>
            <Image src={secondFtMainImg} alt='Feature Image' fill className='object-cover object-center' />
        </div>
    )
}

export default BottomFeatureImage