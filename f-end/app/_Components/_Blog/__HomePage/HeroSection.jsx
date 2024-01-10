import Image from 'next/image'
import React from 'react'
import { bannerImageMSvg } from '@/public/assets/_index'
import { bannerImagePcSvg } from '@/public/assets/_index'

const HeroSection = () => {
    return (
        <section>
            <div className='flex flex-col items-center'>
                {/* mobile - smaller than 570px */}
                <div className="max-[570px]:block hidden banner-img-wrapper  py-16">
                    <Image src={bannerImageMSvg} alt='Tech Dose Banner Image' />
                </div>
                {/* desktop - larger than 570px */}
                <div className="hidden min-[571px]:block banner-img-wrapper py-16 ">
                    <Image src={bannerImagePcSvg} alt='Tech Dose Banner Image' />
                </div>
                <h1 className='banner-heading text-[#CDCACA] text-xl md:text-2xl tracking-widest max-[570px]:tracking-wider'>TECH WONDERS UNVEILED HERE</h1>
            </div>
        </section>
    )
}

export default HeroSection