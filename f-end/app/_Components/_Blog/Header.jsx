// using header tag to import CommonHeader_C inside
import CommonHeader from './CommonHeader'
import React from 'react'

export const Header = () => {
  return (
    <header className='p-1 py-3' id='header'>
        <CommonHeader />
    </header>
  )
}
