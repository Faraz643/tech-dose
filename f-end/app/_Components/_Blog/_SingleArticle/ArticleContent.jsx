'use client'

// import { SlugDetails } from '@/app/(routes)/(blog)/@modal/(...)blog/article/[slug]/page'
import React, { useContext } from 'react'
import { ArticleDetails } from '../_BlogPage/InterceptionContext'

const ArticleContent = ({ contentFor }) => {
  const { articleDetails, onModalClose } = useContext(ArticleDetails) // articleDetails.content

  return (
    <article className='px-8 max-[570px]:px-4'>
      <p className={`article-content ${contentFor === 'modalPage' ? 'text-black' : 'text-[#e4e2e2]'}  tracking-wider text-xl text-left max-[570px]:text-[16px]`}>{articleDetails.description}</p>
    </article>
  )
}

export default ArticleContent