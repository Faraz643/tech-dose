'use client'

import React, { useEffect, useState } from 'react'
import ArticleCard from './ArticleCard'
import useFetchArticles from '@/app/(routes)/(blog)/useFetchArticles'

const AllArticles = ({ filteredMonth }) => {
    const [articleDeleted, setArticleDeleted] = useState(true)
    const { allArticles, fetchData } = useFetchArticles()
    useEffect(() => {
        fetchData()
    }, [articleDeleted])
    const filteredArticles = filteredMonth === 'Show All' ? allArticles : allArticles.filter((article) => article.month === filteredMonth)

    return (
        <div className="bg-blur min-h-[300px] mt-3 rounded-[25px] !border-white flex gap-5 p-3 flex-wrap justify-center ">
            {

                filteredArticles.map((article) => (
                    <ArticleCard articleDetails={article} onDelete={setArticleDeleted} />
                ))
            }

        </div>
    )
}

export default AllArticles