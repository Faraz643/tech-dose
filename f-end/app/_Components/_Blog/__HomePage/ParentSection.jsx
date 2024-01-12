import React from 'react'

const ParentSection = ({ children }) => {
    return (
        <section className='flex justify-center px-4'>
            {children}
        </section>
    )
}

export default ParentSection