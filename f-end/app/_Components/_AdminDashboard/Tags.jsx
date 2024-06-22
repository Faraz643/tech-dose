import { text } from '@/public/assets/_index'
import { useRouter } from 'next/navigation'
import React from 'react'
const Tags = ({ backgC, textC, actionText, slug, renderOnDelete, thumbnail }) => {
    const router = useRouter()
    const bgColor = backgC
    const textColor = textC
    const action = actionText
    async function handleDelete() {
        // console.log('article deleted', slug)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/article/${slug}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({ thumbnailPath: thumbnail })
        })
        renderOnDelete((prev) => !prev)

        if (response.status === 204) {
            const data = await response.json()
            console.log(data)
        }

    }
    function handleUpdate() {
        router.push(`/admin/edit-article?slug=${slug}`)
    }

    return (
        <div className='flex items-center gap-1 justify-center px-2 rounded-[100px] text-center mt-2 hover:cursor-pointer' style={{ backgroundColor: `${bgColor}`, color: `${textColor}`, border: `1px solid ${textColor}` }} onClick={action === 'Delete' ? handleDelete : action === 'Update' ? handleUpdate : undefined}>
            <span >{action}</span>
            <span className='' style={{ color: `${textColor}` }}>•</span>
        </div >
    )
}

export default Tags