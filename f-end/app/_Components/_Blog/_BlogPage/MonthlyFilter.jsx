'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Arrow from './Arrow'
import { months } from '@/app/(routes)/(blog)/utils'

const MonthlyFilter = ({ children }) => {
    const [filterOpen, setFilterOpen] = useState(false)
    const [monthOptions, setmonthOptions] = useState(false)
    const [filteredMonth, setFilteredMonth] = useState('Show All')
    const handleFilterOpen = () => {

        if (filterOpen) {
            setFilterOpen(false)
            setmonthOptions(false)
        } else {
            setFilterOpen(true)
            setmonthOptions(true)
        }
    }
    const handleMonthButtonClick = (month) => {
        setFilteredMonth(month);
    };
    return (<>
        <div className='flex justify-end p-10 z-[2]'>
            <div className=' relative'>
                <button className='flex justify-between items-center w-[150px] bg-[#C8CCCF] p-2 font-futureEarth rounded-[10px] active:border-[#33323290] active:border-[2px] duration-100' onClick={handleFilterOpen}>{`${filteredMonth} `}
                    {filterOpen ? <Arrow rotate={true} /> : <Arrow />}
                </button>
                <div className={`absolute w-full rounded-[10px] bg-[#e0e1e2] h-auto flex-col self-start justify-self-start top-12 p-2 duration-300 ${monthOptions ? 'flex' : 'hidden'}`}>
                    {
                        months.map((element) => (
                            <button key={element.id} className='text-left p-1 px-3 hover:bg-[#a0a09eab] rounded-[10px] duration-100' value={element.month} onClick={() => setFilteredMonth(() => handleMonthButtonClick(element.month))}>
                                {element.month}
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
        {children && React.Children.map(children, child => React.cloneElement(child, { filteredMonth }))}
    </>
    )
}

export default MonthlyFilter