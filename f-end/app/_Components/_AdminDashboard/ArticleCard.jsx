import { gadgets, redirect } from '@/public/assets/_index'
import Image from 'next/image'
import React from 'react'
import Tags from './Tags'
import Link from 'next/link'



const ArticleCard = ({ articleDetails, onDelete }) => {




    return (
        <div className="h-[260px] w-[260px] bg-blur rounded-[10px] !border-white p-2 duration-200 hover:bg-[#ffffffc2] cursor-default">
            <div className='relative w-full h-[120px] rounded-[10px] overflow-hidden'>
                <Image src={`http://localhost:3001/api/article/img/${articleDetails.thumbnail}`} fill alt='Article Title Thumbnail' className='object-cover' loading='lazy' />
            </div>
            <div className='mt-2'>
                <p className='leading-tight '>{articleDetails.title}</p>
            </div>
            <div>
                <span className='text-[#7A7A7A]'>{articleDetails.month}</span>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-1'>
                    <Tags backgC='#FFD99F' textC='#D47800' actionText='Update' slug={articleDetails.slug} />
                    <Tags backgC='rgba(255, 5, 5, 0.47)' textC='#C20000' actionText='Delete' slug={articleDetails.slug} thumbnail={articleDetails.thumbnail} renderOnDelete={onDelete} />
                </div>
                <Link href={`/blog/article/${articleDetails.slug}`} target='_blank'>
                    <Image src={redirect} width={25} alt='{post_title}' />
                </Link>
            </div>
        </div>
    )
}

export default ArticleCard