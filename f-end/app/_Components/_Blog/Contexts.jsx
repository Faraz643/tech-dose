'use client'

import { createContext, useState } from "react";
import React from 'react'

export const ActiveNavContext = createContext();


const Contexts = ({ children }) => { // works as parent component having state which is shared by each of its children component
    const [active, setActive] = useState('home') // active navbar menu

    return (
        <ActiveNavContext.Provider value={{ active, setActive }}>
            {children}
        </ActiveNavContext.Provider>
    )
}

export default Contexts


