import { gadgets, redirect } from '@/public/assets/_index'
import Image from 'next/image'
import React from 'react'
import Tags from './Tags'
import Link from 'next/link'



const ArticleCard = () => {
    return (
        <div className="h-[260px] w-[260px] bg-blur rounded-[10px] !border-white p-2 duration-200 hover:bg-[#ffffffc2] cursor-default">
            <div className='relative w-full h-[120px] rounded-[10px] overflow-hidden'>
                <Image src={gadgets} fill alt='Article Title Thumbnail' className='object-cover' loading='lazy'/>
            </div>
            <div className='mt-2'>
                <p className='leading-tight '>Metas Threads: From Boom to Search for New Users</p>
            </div>
            <div>
                <span className='text-[#7A7A7A]'>January</span>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-1'>
                    <Tags backgC='#FFD99F' textC='#D47800' actionText='Update' />
                    <Tags backgC='rgba(255, 5, 5, 0.47)' textC='#C20000' actionText='Delete' />
                </div>
                <Link href='#'>
                    <Image src={redirect} width={25} />
                </Link>
            </div>
        </div>
    )
}

export default ArticleCard