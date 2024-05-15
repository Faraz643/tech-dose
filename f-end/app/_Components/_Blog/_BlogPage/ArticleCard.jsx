'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { twitterFeedThumbnail } from '@/public/assets/_index'
import { articleDetails } from '@/app/(routes)/(blog)/utils'
import useFetchArticles from '@/app/(routes)/(blog)/useFetchArticles'

const ArticleCard = ({ filteredMonth }) => {

  // const [articles, setArticles] = useState([])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3001/api/article',
  //         {
  //           method: 'GET'
  //         });
  //       const data = await response.json()
  //       console.log(data)
  //       setArticles(data)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchData()
  // }, []);


  // console.log(articles)
  // articles.map((elem) => console.log(elem))
  // articles.map((elem) => console.log(`http://localhost:3001/api/article/img/${elem.thumbnail}`))

  // console.log(articleDetails[0])

  const { allArticles } = useFetchArticles()

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

  // if (!allArticles || allArticles.length === 0) {
  //   return <div>Loading...</div>;
  // }

  const filteredArticles = filteredMonth === 'Show All' ? allArticles : allArticles.filter((article) => article.month === filteredMonth)
  return (
    <div className='p-10 bg-[#00000000] flex justify-center'>
      <div className='flex justify-center items-center flex-wrap gap-20 max-[570px]:flex-col max-[570px]:items-center'>
        {
          filteredArticles.map((article) => (
            <Link key={article.id} href={`/blog/article/${article.slug}`} target='_blank' rel='noopener noreferrer' className='w-[300px] h-[370px]'>
              <div className="relative article-card w-[100%] h-[100%]  border-[#29292800] rounded-[20px] duration-300 hover:!bg-[length:260%]"
                style={{ ...thumbnailStyling, backgroundImage: `url(http://localhost:3001/api/article/img/${article.thumbnail})` }}>
                <div className='flex flex-col justify-between h-full p-3'>
                  <span className="text-center bg-[#E1FF4A] py-1 px-3 rounded-[10px] w-[80px]">Meta</span>
                  <div className='bg-[#ffffff5f] rounded-[10px] p-2' style={blurStyle}>
                    <p className='text-[#f4f4f6]'>{article.title}</p>
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