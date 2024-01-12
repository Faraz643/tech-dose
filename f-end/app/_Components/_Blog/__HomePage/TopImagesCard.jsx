import React from 'react'
import Image from 'next/image'
import { topImagesCard } from '@/app/(routes)/(blog)/utils'

const TopImagesCard = () => {
    return (
        <div className='top-left-images-card flex gap-6 max-[450px]:gap-3'>
            {
                topImagesCard.map((image) => (
                    <div key={image.key} className='relative overflow-hidden border-[6px] max-[450px]:border-[5px]'>
                        <Image src={image.imageSrc} alt={image.alt} fill className='object-cover' />
                    </div>
                ))
            }
        </div>
    )
}

export default TopImagesCard