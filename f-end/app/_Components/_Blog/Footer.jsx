// using footer tag to import CommonHeader_C inside 

import React from 'react'
import CommonHeader from './CommonHeader'


const Footer = () => {
    return (
        <footer className='min-[570px]:pt-10'>
            <CommonHeader />
        </footer>
    )
}

export default Footer