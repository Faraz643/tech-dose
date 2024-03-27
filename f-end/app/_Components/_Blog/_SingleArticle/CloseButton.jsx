'use client'
// import { SlugDetails } from '@/app/(routes)/(blog)/@modal/(...)blog/article/[slug]/page'
import React, { useContext } from 'react'
import { ArticleDetails, ArticleDetailsContext } from '../_BlogPage/InterceptionContext'

const CloseButton = () => {
  const {  articleDetails, onModalClose } = useContext(ArticleDetails)

  return (
    <div className='bg-white rounded-full h-[40px] w-[40px] font-sans text-3xl flex justify-center items-center p-2 hover:bg-[#efeeee] cursor-default' onClick={onModalClose}><span>X</span></div>
  )
}
export default CloseButton