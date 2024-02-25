import React from 'react'

const MainContentWrapper = ({ children }) => {
    return (
        <main className="bg-blur  flex-1 rounded-[25px] p-5">
            {children}
        </main>
    )
}

export default MainContentWrapper