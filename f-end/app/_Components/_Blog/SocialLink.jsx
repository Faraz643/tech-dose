import React from 'react'
import { socialLinks } from '../../(routes)/(blog)/utils'
import Link from 'next/link'
import Image from 'next/image'
import { homeIcon } from '@/public/assets/_index'
const SocialLink = () => {
    return (
        <div className='gap-4 hidden md:flex'>
            {
                socialLinks.map((link) => (
                    <Link key={link.id} href={link.socialLink} className='hidden-items'>
                        <Image src={link.socialIcon} width={22} height={22} alt={link.socialName} />

                    </Link>
                ))
            }
        </div>
    )
}

export default SocialLink