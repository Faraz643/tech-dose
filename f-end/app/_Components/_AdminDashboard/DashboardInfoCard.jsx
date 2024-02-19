import React from 'react'

const DashboardInfoCard = ({title, counts}) => {
    return (
            <div className='w-[250px] min-h-[100px] bg-blur-white !border-none flex flex-col gap-3 items-center justify-center text-center rounded-[20px] hover:cursor-pointer max-[500px]:w-[150px]'>
                <p className='text-[1rem]'>{title}</p>
                <p className='text-[#008F8D] text-[1.5rem]'>{counts}</p>
            </div>
       
    )
}

export default DashboardInfoCard