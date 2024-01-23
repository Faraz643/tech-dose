import { SlugDetails } from '@/app/(routes)/(blog)/@modal/(...)blog/article/[slug]/page'
import React, { useContext } from 'react'

const AuthorName = () => {
  const { articleDetails } = useContext(SlugDetails) // articleDetails.author_name

  return (
    <div className='text-sm'>
        <span className='text-black'>Author:&nbsp;</span> 
        <span className='text-[#797575]'>Author Name</span>
    </div>
  )
}

export default AuthorName