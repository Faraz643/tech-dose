'use client'

// import SlugDetails from '@/app/(routes)/(blog)/@modal/(...)blog/article/[slug]/page'
import React, { useContext } from 'react'
import { ArticleDetails } from '../_BlogPage/InterceptionContext'

const ArticleAuthorName = ({ authorFor }) => {
  const { articleDetails, onModalClose } = useContext(ArticleDetails) // articleDetails.author_name

// if(!articleDetails){
//   return (<div>hi</div>)
// }
  
  return (
    <div className='text-sm'>
      
      <span className={` ${authorFor === 'modalPage' ? 'text-black' : 'text-white'}`}>Author:&nbsp;</span>
      <span className='text-[#797575]'>{articleDetails.id}</span>
    </div>
  )
}

export default ArticleAuthorName