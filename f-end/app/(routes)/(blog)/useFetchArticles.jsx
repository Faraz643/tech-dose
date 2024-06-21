import React, { useEffect, useState } from 'react'

const useFetchArticles = (slug = null) => {


  // all states
  const [singleArticleDetails, setSingleArticleDetails] = useState({})
  const [allArticles, setallArticles] = useState([])
  const [placeholder, setPlaceholder] = useState('skeleton') // ''

  const fetchData = async () => {

    try {
      let endpoint = `${process.env.NEXT_PUBLIC_BACKEND_API}/article`
      if (slug) {
        endpoint = `${process.env.NEXT_PUBLIC_BACKEND_API}/article/${slug}`
      }
      const response = await fetch(endpoint, { method: 'GET', })
      if (response.ok) {
        const data = await response.json()
        if (slug) {
          setSingleArticleDetails(data.articleData[0])
        } else {
          setallArticles(data)
        }
        setPlaceholder('')
      }
    } catch (err) {
      console.log('An error occured while fetching data', err)
    } finally {
      setPlaceholder('')
    }
  }


  useEffect(() => {
    fetchData()
  }, [])
  return { singleArticleDetails, allArticles, placeholder, fetchData }
}

export default useFetchArticles