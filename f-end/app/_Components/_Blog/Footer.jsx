// using footer tag to import CommonHeader_C inside 
'use client'
import React, { useEffect, useState } from 'react'
import CommonHeader from './CommonHeader'

const Footer = () => {

  const [mobFooterActive, setMobFooterActive] = useState('0');
  // Accepted Values for mobFooterActive  :
  // '0'-> false (footer hidden)
  // '1'-> show footer
  // '11'-> when footer reaches bottom, translate it above the Heading
  useEffect(() => {
    const header = document.getElementById('header')
    const handleScroll = (event) => {
      const scrollView = window.scrollY
      const headerHeight = header.getBoundingClientRect().height
      const bodyHeight = document.body.offsetHeight
      const windowHeight = window.innerHeight
      const totalScreenHeight = (scrollView + windowHeight)
      if ((scrollView) > (headerHeight)) {
        setMobFooterActive('1')
      }
      else {
        
        setMobFooterActive('0')
      }
      if ((totalScreenHeight+120) >= bodyHeight) {  // reached bottom of the screen
        setMobFooterActive('11')
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <footer className={`min-[570px]:pt-10  ${mobFooterActive === '1' ? 'footer-show' : mobFooterActive === '11' ? 'footer-top-heading' : ''}`}>
      < CommonHeader />
    </footer >
  )
}

export default Footer