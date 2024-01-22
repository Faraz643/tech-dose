import React from 'react'
import Thumbnail from './Thumbnail'
import CloseButton from './CloseButton'
import AuthorName from './AuthorName'
import ArticleContent from './ArticleContent'
import ArticleTitle from './ArticleTitle'
const ArticleContentWrapper = () => {
    return (
        <div className='flex justify-center max-[1440px]:w-[100%] max-[2000px]:w-[1200px]'>
            <div className='relative w-[90%] min-h-[500px] bg-white mt-[5%] rounded-[40px] border-[#8c6efa] border-[5px] max-[570px]:border-[3px]'>
                <div className='absolute right-[-4%] top-[-6%]'>
                    <CloseButton />
                </div>
                <div className='thumbnail-wrapper flex justify-center mt-[-10%]'>
                    <Thumbnail />
                </div>
                <div className='flex justify-center items-center flex-col gap-4 p-4'>
                    <div>
                        <ArticleTitle />
                    </div>
                    <div>
                        <AuthorName />
                    </div>
                    <div>
                        <span className='font-futureEarth text-black text-4xl'>”</span>
                    </div>
                </div>
                <div>
                    <ArticleContent />
                </div>
                <div className='flex justify-center text-6xl text-[#797575]'>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </div>
            </div>
        </div>
    )
}

export default ArticleContentWrapper