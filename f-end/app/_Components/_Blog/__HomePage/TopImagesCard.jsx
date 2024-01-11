import React from 'react'
import Image from 'next/image'
import { vrMan, gamingConsole, gadgets } from '@/public/assets/_index'

const TopImagesCard = () => {
    return (
        <div className='top-left-images-card flex gap-6 max-[450px]:gap-3'>
            <div className='relative overflow-hidden border-[6px] max-[450px]:border-[5px]'>
                <Image src={gamingConsole} alt='Gaming Console' fill className='object-cover ' />
            </div>
            <div className='relative overflow-hidden border-[6px] max-[450px]:border-[5px]'>
                <Image src={gadgets} alt='Gadgets' fill className='object-cover ' />
            </div>
            <div className='relative overflow-hidden border-[6px] max-[450px]:border-[5px]'>
                <Image src={vrMan} alt='Man wearing VR headset' fill className='object-cover ' />
            </div>
        </div>
    )
}

export default TopImagesCard