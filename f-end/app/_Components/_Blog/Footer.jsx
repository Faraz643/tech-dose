// using footer tag to import CommonHeader_C inside 

import React from 'react'
import CommonHeader from './CommonHeader'


const Footer = () => {
    return (
        <footer className='hidden absolute bottom-3 p-1'>
            <CommonHeader />
        </footer>
    )
}

export default Footer