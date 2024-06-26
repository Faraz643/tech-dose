'use client'

import { SingleArticleContext } from '@/app/(routes)/(blog)/blog/article/[slug]/page'
// import { SlugDetails } from '@/app/(routes)/(blog)/@modal/(...)blog/article/[slug]/page'
import React, { useContext } from 'react'

const ArticleContent = ({ contentFor }) => {
  const { articleDetails, onModalClose } = useContext(SingleArticleContext) // articleDetails.content

  return (
    <article className='px-8 max-[570px]:px-4'>
      <p className={`article-content ${contentFor === 'modalPage' ? 'text-black' :
        contentFor === 'skeleton' ? 'bg-[#f4f4f4fe] w-[300px] h-[150px] rounded-[23px]' :
          'text-[#e4e2e2]'}  tracking-wider text-xl text-left max-[570px]:text-[16px]`}>{
            contentFor === 'skeleton' ? '' :
          articleDetails.description}</p>
    </article>
  )
}

export default ArticleContent