import { text } from '@/public/assets/_index'
import React from 'react'

const Tags = ({ backgC, textC, actionText, slug, renderOnDelete }) => {
    const bgColor = backgC
    const textColor = textC
    const action = actionText
    async function handleDelete() {
        // console.log('article deleted', slug)
        const response = await fetch(`http://localhost:3001/api/article/${slug}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        renderOnDelete((prev) => !prev)

        if (response.status === 204) {
            const data = await response.json()
            console.log(data)
        }

    }
    function handleUpdate() {
        console.log('updated')

    }

    return (
        <div className='flex items-center gap-1 justify-center px-2 rounded-[100px] text-center mt-2 hover:cursor-pointer' style={{ backgroundColor: `${bgColor}`, color: `${textColor}`, border: `1px solid ${textColor}` }} onClick={action === 'Delete' ? handleDelete : action === 'Update' ? handleUpdate : undefined}>
            <span >{action}</span>
            <span className='' style={{ color: `${textColor}` }}>•</span>
        </div >
    )
}

export default Tags