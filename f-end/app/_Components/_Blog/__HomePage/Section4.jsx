import React from 'react'
import CommonContentLayout from './CommonContentLayout'
import ParentSection from './ParentSection'
const Section4 = () => {
    return (
        <ParentSection>
            <div className='w-[1200px] my-20'>
                <CommonContentLayout section='section4' />
                <div className='bg-[#060F16] rounded-[100px] text-center text-[#E1FF4A] font-futureEarth p-6 max-[570px]:p-3 max-[570px]:px-0'>
                    <h3 className='text-4xl tracking-wider max-[570px]:text-[1.1rem]'>BROWSE PREVIOUS EDITIONS</h3>
                </div>
            </div>
        </ParentSection>
    )
}

export default Section4