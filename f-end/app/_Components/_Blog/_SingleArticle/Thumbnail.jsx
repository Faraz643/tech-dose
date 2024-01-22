import { smartRingThumbnail } from '@/public/assets/_index'
import Image from 'next/image'
import React from 'react'

const Thumbnail = () => {
  return (
    <div className='relative w-[400px] h-[150px] rounded-[100px] bg-blue-500 overflow-hidden border-[#E1FF4A] border-[5px] max-[570px]:w-[200px] max-[570px]:h-[100px] max-[570px]:border-[3px]'>
        <Image src={smartRingThumbnail} objectFit='cover' layout='fill' alt='Article Thumbnail Image'/>
    </div>
  )
}

export default Thumbnail