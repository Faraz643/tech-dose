import { SlugDetails } from '@/app/(routes)/(blog)/@modal/(...)blog/article/[slug]/page'
import React, { useContext } from 'react'

const ArticleTitle = () => {
  const { articleDetails } = useContext(SlugDetails) // articleDetails.title

    const articleTitle = 'smart rings smart rings smart rings smart rings smart rings smart rings smart rings'
    return (
        <div>
            <h2 className='text-center capitalize text-[#5F5E5E] text-5xl max-[570px]:text-3xl leading-snug'>{articleTitle}</h2>
        </div>
    )
}
export default ArticleTitle