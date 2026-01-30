import React from 'react'
import { BookAppointment } from './BookAppointment'
import heroImg from "@/assets/heroImg.png"
function HeroSection() {
    return (
        <div className='flex flex-row-reverse w-full max-lg:justify-center max-lg:items-center relative'>
            <img src={heroImg} alt="Hero" className='bg-cover absolute -z-10 w-full h-full' />
            <div className='py-6 max-md:pt-14 lg:pr-40'>

                <BookAppointment />
            </div>
        </div>
    )
}

export default HeroSection