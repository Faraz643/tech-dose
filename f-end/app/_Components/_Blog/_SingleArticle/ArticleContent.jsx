import { SlugDetails } from '@/app/(routes)/(blog)/@modal/(...)blog/article/[slug]/page'
import React, { useContext } from 'react'

const ArticleContent = ({ contentFor }) => {
  // const { articleDetails } = useContext(SlugDetails) // articleDetails.content

  return (
    <article className='px-8 max-[570px]:px-4'>
      <p className={`article-content ${contentFor === 'modalPage' ? 'text-black' : 'text-[#e4e2e2]'}  tracking-wider text-xl text-left max-[570px]:text-[16px]`}>Smart ring is a wearable electronic gadget with cutting edge mobile components that combine mobile device functions with unique features practical for handheld or mobile use.
        Smart rings, which are often the size of traditional rings or larger, combine and activity tracking with the functionality of a mobile device, such as the ability to make payments and mitigating access control.</p>
    </article>
  )
}

export default ArticleContent