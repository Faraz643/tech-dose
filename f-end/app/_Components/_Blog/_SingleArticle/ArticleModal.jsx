import { SlugDetails } from '@/app/(routes)/(blog)/@modal/(...)blog/article/[slug]/page'
import React, { useContext } from 'react'
import ArticleContentWrapper from './ArticleContentWrapper'

const ArticleModal = () => {
  return (
    <div className='article-modal overflow-y-scroll pt-[50px]'>
      <ArticleContentWrapper />
    </div>
  )
}

export default ArticleModal