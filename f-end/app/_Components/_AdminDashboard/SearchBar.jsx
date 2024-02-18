import { search } from '@/public/assets/_index'
import Image from 'next/image'
import React from 'react'



export const SearchBar = () => {
    return (
        <form action="">
            <label htmlFor='search-article' className='flex items-center bg-blur-white py-1 px-1 rounded-[100px]  hover:bg-[#ffffffcc] text-center'>
                <div className='border-r-[2px] border-[#00000063] pr-4' >
                    <Image src={search} width={20} alt='' />
                </div>
                <input id='search-article' className='bg-transparent outline-none active:outline-none active:bg-[#ffffffcc] text-center' placeholder='Search' />
                {/* Logic for searching */}
                {/* <submit />  */}
            </label>
        </form>


    )
}
