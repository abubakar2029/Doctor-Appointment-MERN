import React from 'react'
import Navbar from '../components/main/Navbar'

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full'>
        <div className="fixed top-0 left-0 right-0 z-50">
            <Navbar />
        </div>
        <div className="pt-16 w-full">
            {children}
        </div>
    </div>
  )
}

export default MainLayout