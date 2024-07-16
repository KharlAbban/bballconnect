import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='relative h-full w-full bg-blue-500 flex flex-col gap-6 items-center justify-center'>
        <p className='text-5xl'>🏀</p>
        <Link to="/courts" className='bg-orange-500 text-xl px-4 py-3 rounded-sm hover:rounded-full hover:bg-orange-600 underline duration-300 transition-all'>Go see the f**kn courts now!</Link>
    </div>
  )
}

export default LandingPage