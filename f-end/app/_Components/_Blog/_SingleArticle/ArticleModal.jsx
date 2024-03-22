'use client'
import { SlugDetails } from '@/app/(routes)/(blog)/@modal/(...)blog/article/[slug]/page'
import React, { useContext } from 'react'
import ArticleContentWrapper from './ArticleContentWrapper'
import { ArticleDetails } from '../_BlogPage/InterceptionContext'

const ArticleModal = () => {
  const {  articleDetails, onModalClose } = useContext(ArticleDetails)

  return (
    <div className='article-modal overflow-y-scroll pt-[50px]' onClick={onModalClose}>
      <ArticleContentWrapper />
    </div>
  )
}

export default ArticleModal