'use client'

import { SingleArticleContext } from '@/app/(routes)/(blog)/blog/article/[slug]/page'
// import SlugDetails from '@/app/(routes)/(blog)/@modal/(...)blog/article/[slug]/page'
import React, { useContext } from 'react'
const ArticleAuthorName = ({ authorFor }) => {
  const { articleDetails, onModalClose } = useContext(SingleArticleContext) // articleDetails.author_name

  // if(!articleDetails){
  //   return (<div>hi</div>)
  // }

  return (
    <div className='text-sm'>

      <span className={` ${authorFor === 'modalPage' ? 'text-black' : 'text-white'}`}>Author:&nbsp;</span>
      <span className={`text-[#797575] ${authorFor === 'skeleton' && 'bg-[#f4f4f4fe] min-w-[30px] min-h-[10px] rounded-[5px]'} `}>{
        authorFor === 'skeleton' ? 'loading' :
          articleDetails.id}</span>
    </div>
  )
}

export default ArticleAuthorName