import { SlugDetails } from '@/app/(routes)/(blog)/@modal/(...)blog/article/[slug]/page'
import React, { useContext } from 'react'

const ArticleTitle = ({ titleFor }) => {
    //   const { articleDetails } = useContext(SlugDetails) // articleDetails.title

    const articleTitle = 'smart rings: Innovating Future'
    return (
        <div>
            <h2 className={`text-center capitalize ${titleFor === 'modalPage' ? 'text-[#5F5E5E]' : 'text-[#e4e2e2]'} text-5xl max-[570px]:text-3xl leading-snug`}>{articleTitle}</h2>
        </div>
    )
}
export default ArticleTitle