import { sampleTags } from '@/app/(routes)/(blog)/utils'
import React from 'react'


const tagList = sampleTags.map((e) => (
    <li key={e.id} className='list-none rounded-[100px] p-1 bg-[#dfdfdf] hover:bg-[#c5c5c5] duration-100'>{e.tag}</li>
))
const AllTags = () => {



    return (
        <div className='absolute min-h-[150px] min-w-[200px] bg-white top-12 left-1 rounded-[15px] flex flex-wrap gap-2 p-1'>
            {tagList}
        </div>
    )
}

export default AllTags