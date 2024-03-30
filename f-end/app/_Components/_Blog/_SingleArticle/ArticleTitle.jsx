'use client'


import { SingleArticleContext } from '@/app/(routes)/(blog)/blog/article/[slug]/page'
// import { SlugDetails } from '@/app/(routes)/(blog)/@modal/(...)blog/article/[slug]/page'
import React, { useContext } from 'react'
// import { ArticleDetails } from '../_BlogPage/InterceptionContext'


const ArticleTitle = ({ titleFor }) => {
    const { articleDetails, onModalClose } = useContext(SingleArticleContext) // articleDetails.title

    const articleTitle = 'smart rings: Innovating Future'
    return (
        <div className='flex justify-center'>
            <h2 className={`text-center capitalize ${titleFor === 'modalPage' ? 'text-[#5F5E5E]' : titleFor === 'skeleton' ? 'bg-[#f4f4f4fe] w-[700px] h-[40px] rounded-[12px]' : 'text-[#e4e2e2]'} text-5xl max-[570px]:text-3xl leading-snug`}>{
                titleFor === 'skeleton' ? '' :
                    articleDetails.title
            }</h2>
        </div>
    )
}
export default ArticleTitle