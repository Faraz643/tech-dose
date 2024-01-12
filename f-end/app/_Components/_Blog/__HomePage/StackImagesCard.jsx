import Image from 'next/image'
import React from 'react'
import { vrAudience, flyingCar, vrSystem } from '@/public/assets/_index'


const StackImagesCard = () => {
    return (
        <div className='stack-images-parent flex gap-8 relative'>
            <div className="stack-image overflow-hidden border-[6px] relative">
                <Image src={vrAudience} alt='VR Audience' fill className='object-cover' />
            </div>
            <div className="stack-image overflow-hidden border-[6px] relative">
                <Image src={vrSystem} alt='VR Sytem' fill className='object-cover' />
            </div>
            <div className='absolute top-stack-wrapper'>
                <div className="stack-image top-stack overflow-hidden border-[6px] br-[100%] relative">
                    <Image src={flyingCar} alt='Flying Futuristic Car' fill className='object-cover' />
                </div>
            </div>
        </div>
    )
}

export default StackImagesCard