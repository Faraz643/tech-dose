import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { twitterFeedThumbnail } from '@/public/assets/_index'
import { articleDetails } from '@/app/(routes)/(blog)/utils'
const ArticleCard = () => {
  const thumbnailStyling = {
    backgroundImage: `url('${twitterFeedThumbnail.src}')`,
    backgroundPosition: 'center',
    backgroundSize: '230%',
    backgroundRepeat: 'no-repeat',
    borderRight: '5px solid #363535'
  }
  const blurStyle = {
    background: 'rgba(255, 255, 255, 0.25)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(20px)',
    // -webkit - backdrop - filter: 'blur(16px)',
    borderEadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  }
  return (
    <div className='p-10 bg-[#00000000] flex justify-center'>
      <div className='flex justify-center items-center flex-wrap gap-20 max-[570px]:flex-col max-[570px]:items-center'>
        {
          articleDetails.map((article) => (
            <Link key={article.id} href='/blog/article/3' className='w-[300px] h-[370px]'>
              <div className="relative article-card w-[100%] h-[100%]  border-[#29292800] rounded-[20px] duration-300 hover:!bg-[length:260%]"
                style={{ ...thumbnailStyling, backgroundImage: `url('${article.thumbnail.src}')` }}>
                <div className='flex flex-col justify-between h-full p-3'>
                  <span className="text-center bg-[#E1FF4A] py-1 px-3 rounded-[10px] w-[80px]">{article.tag}</span>
                  <div className='bg-[#ffffff5f] rounded-[10px] p-2' style={blurStyle}>
                    <p className='text-[#f4f4f6]'>Metas Threads: From Boom to Search for New Users</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        }


      </div>
    </div>
  )
}

export default ArticleCard