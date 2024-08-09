'use client'


import { SingleArticleContext } from '@/app/(routes)/(blog)/blog/article/[slug]/page'
// import { SlugDetails } from '@/app/(routes)/(blog)/@modal/(...)blog/article/[slug]/page'
import { smartRingThumbnail, appleWatchThumbnail, article, imagePlaceholder } from '@/public/assets/_index'
import Image from 'next/image'
import React, { useContext } from 'react'
const ArticleThumbnail = ({ thumbnailFor }) => {
  const { articleDetails, onModalClose } = useContext(SingleArticleContext)
  //articleDetails.thumbnail

  return (

    <div className={`relative ${thumbnailFor === 'modalPage' ? 'w-[400px] h-[150px] rounded-[100px] bg-[#f4f4f4fe] overflow-hidden border-[#E1FF4A] border-[5px] max-[570px]:w-[200px] max-[570px]:h-[100px] max-[570px]:border-[3px]' : 'rounded-[23px] w-[500px] h-[300px] p-4 bg-[#f4f4f4fe] overflow-hidden max-[570px]:w-[400px] max-[570px]:h-[200px] max-[459px]:w-[300px]'}`}>
      {thumbnailFor === 'skeleton' ? (
        // <Image src={imagePlaceholder} objectFit='cover' layout='fill' alt='Article Thumbnail Image' />
        <div className=''></div>
      ) : <Image src='https://firebasestorage.googleapis.com/v0/b/tech-dose-images.appspot.com/o/images%2FScreenshot%202024-08-06%20215021.png?alt=media&token=e9e4ccf8-af0c-49d1-98d8-b21b6fbe173d' objectFit='cover' layout='fill' alt='Article Thumbnail Image' />}

    </div>
  )
}

export default ArticleThumbnail