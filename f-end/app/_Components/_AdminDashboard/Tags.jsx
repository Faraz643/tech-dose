import { text } from '@/public/assets/_index'
import React from 'react'

const Tags = ({ backgC, textC, actionText }) => {
    const bgColor = backgC
    const textColor = textC
    const action = actionText
    return (
        <div className='flex items-center gap-1 justify-center px-2 rounded-[100px] text-center mt-2 hover:cursor-pointer' style={{ backgroundColor: `${bgColor}`, color: `${textColor}`, border: `1px solid ${textColor}` }}>
            <span >{action}</span>
            <span className='' style={{ color: `${textColor}` }}>•</span>
        </div>
    )
}

export default Tags