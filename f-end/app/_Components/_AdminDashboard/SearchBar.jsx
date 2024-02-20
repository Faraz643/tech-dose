import { search } from '@/public/assets/_index'
import Image from 'next/image'
import React from 'react'



export const SearchBar = () => {
    return (

        <div className='w-[150px] h-[100%] bg-blur-white rounded-[100px] flex items-center hover:bg-[#ffffffcc]'>
            <div className='px-1'><Image src={search} width={20} alt='Search' /></div>

            <input type="text" id='search-article' className='absolute h-[100%] w-[100%]h-full w-full bg-transparent outline-none focus:border-none active:bg-[#ffffffcc] rounded-[100px] border-none text-center' placeholder='Search' />
            <label htmlFor="search-article" className='absolute w-full h-full'></label>
        </div>



        // <form action="">
        //     <label htmlFor='search-article' className='flex items-center bg-blur-white py-1 px-1 rounded-[100px]  hover:bg-[#ffffffcc] text-center'>
        //         <div className='border-r-[2px] border-[#00000063] pr-4' >
        //             <Image src={search} width={20} alt='' />
        //         </div>
        //         <input id='search-article' className='bg-transparent outline-none active:outline-none active:bg-[#ffffffcc] text-center' placeholder='Search' />
        //         {/* Logic for searching */}
        //         {/* <submit />  */}
        //     </label>
        // </form>


    )
}
