import React from 'react'
import { DoctorSearch } from '../../components/main/DoctorSearch'
import Stats from '../../components/main/Stats'
import OurExperts from '../../components/main/OurExperts'
import Testimonials from '@/components/main/Testimonials'
import SubcribeSection from '@/components/main/SubcribeSection'
import { BookAppointment } from '@/components/main/BookAppointment'
import HeroSection from '@/components/main/HeroSection'

function Homepage() {
    return (
        <div>
            <HeroSection />
            <div className='w-full px-12 pt-12 gap-y-12 flex flex-col'>
                <DoctorSearch />
                <Stats />
                <OurExperts />
                <Testimonials />
                <SubcribeSection />
            </div>
        </div>
    )
}

export default Homepage