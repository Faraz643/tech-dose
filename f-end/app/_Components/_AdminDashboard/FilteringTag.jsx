'use client'

import React, { useState } from 'react'
import AllTags from './AllTags'


const FilteringTag = ({ tagName }) => {
    const [tagList, ShowTagList] = useState(false)
    function handleShowTagList() {
        ShowTagList(!tagList ? true : false)
    }
    return (
        <div className="flex justify-center hover:cursor-default relative" >

            <span className="bg-blur-white py-1 px-4 rounded-[100px]  hover:bg-[#ffffffcc]" onClick={handleShowTagList}>
                {tagName}
            </span>
            {
                tagList && tagName === 'Tags' &&
                <AllTags />

            }
        </div>

    )
}

export default FilteringTag






