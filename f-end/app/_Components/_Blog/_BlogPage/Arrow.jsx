import { dropDownIcon } from '@/public/assets/_index'
import Image from 'next/image'
import React from 'react'

const Arrow = ({ rotate = false }) => {
    return (
        <Image width={20} src={dropDownIcon} className={`${rotate && 'rotate-180'}`} alt='Filter Arrow' />
    )
}

export default Arrow