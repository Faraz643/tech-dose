import React from 'react'
import ArticleThumbnail from './ArticleThumbnail'
import CloseButton from './CloseButton'
import ArticleAuthorName from './ArticleAuthorName'
import ArticleContent from './ArticleContent'
import ArticleTitle from './ArticleTitle'

const ArticleContentWrapper = () => {

    const stopPropagations = (event) => {
        event.stopPropagation()
        // console.log('clicked')
    }
    return (
        <div className='relative flex justify-center max-[1440px]:w-[100%] max-[2000px]:w-[1200px]' onClick={stopPropagations}>
            <div className='relative w-[90%] min-h-[500px] bg-white mt-[0%] rounded-[40px] border-[#8c6efa] border-[5px] max-[570px]:border-[3px]'>
                <div className='absolute right-[-4%] top-[-6%]'>
                    <CloseButton />
                </div>
                <div className='thumbnail-wrapper flex justify-center mt-[-6%]'>
                    <ArticleThumbnail thumbnailFor='modalPage' />
                </div>
                <div className='flex justify-center items-center flex-col gap-4 p-4'>
                    <div>
                        <ArticleTitle titleFor='modalPage' />
                    </div>
                    <div>
                        <ArticleAuthorName authorFor='modalPage' />
                    </div>
                    <div>
                        <span className='font-futureEarth text-black text-4xl'>”</span>
                    </div>
                </div>
                <div>
                    <ArticleContent contentFor='modalPage' />
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