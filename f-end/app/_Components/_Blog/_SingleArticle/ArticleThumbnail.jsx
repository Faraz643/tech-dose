import { SlugDetails } from '@/app/(routes)/(blog)/@modal/(...)blog/article/[slug]/page'
import { smartRingThumbnail, appleWatchThumbnail } from '@/public/assets/_index'
import Image from 'next/image'
import React, { useContext } from 'react'

const ArticleThumbnail = ({ thumbnailFor }) => {
  // const { articleDetails } = useContext(SlugDetails) //articleDetails.thumbnail

  return (
    
    <div className={`relative ${thumbnailFor === 'modalPage' ? 'w-[400px] h-[150px] rounded-[100px] bg-blue-500 overflow-hidden border-[#E1FF4A] border-[5px] max-[570px]:w-[200px] max-[570px]:h-[100px] max-[570px]:border-[3px]' : 'rounded-[23px] w-[500px] h-[300px] p-4 bg-blue-500 overflow-hidden max-[570px]:w-[400px] max-[570px]:h-[200px] max-[459px]:w-[300px]'}`}>
      <Image src={appleWatchThumbnail} objectFit='cover' layout='fill' alt='Article Thumbnail Image'/>
    </div>
  )
}

export default ArticleThumbnail