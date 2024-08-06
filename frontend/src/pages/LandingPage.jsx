import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {IoArrowForward, IoBasketball} from 'react-icons/io5'


const LandingPage = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText("https://bballconnect.vercel.app")
    setIsCopied(true);
    const copyTimeout = setTimeout(() => setIsCopied(false), 1000);
    
    return () => clearTimeout(copyTimeout);
  }

  return (
    <div className='relative text-pageLightColor h-full w-full flex items-center justify-center max-w-[1600px]'>
      <div className='max-lg:hidden lg:w-1/2 h-full'>
        <img loading='lazy' src='/jumbotron_bg.jpg' className='brightness-75 h-full w-full object-cover' />
      </div>
      <div className='w-full lg:w-1/2 h-full flex items-center relative justify-center'>
        <img loading='lazy' src="/logo.png" className='w-36 brightness-50 absolute top-9 left-7' alt="" />
        <img loading='lazy' src="/logo_gray.png" className='max-xl:hidden w-12 brightness-50 absolute bottom-5 right-8' alt="" />
        <img loading='lazy' src="/logo_white.png" className='w-24 brightness-50 absolute lg:top-3/4 max-lg:bottom-8 max-lg:right-8 lg:left-8' alt="" />
        
        <div className='my-auto w-full xl:w-4/5 xl:h-4/5 xl:px-4 lg:pr-8 px-8 lg:text-end relative'>
          <h3 className='flex items-center lg:justify-end justify-center xl:mb-8 mb-6 pt-1'>
            <img loading='lazy' src="/logo.png" className='lg:w-16 w-24 float-end' alt="" />
          </h3>
          <h4 className='relative mb-3 max-lg:text-center'>
            <span title='Click to copy' onClick={handleClick} className='font-bold md:text-5xl text-3xl font-playwright peer cursor-pointer hover:text-pageLightColor/75'>BballConnect</span>
            <span className='absolute text-xs font-mono text-gray-100 bg-gray-700 w-max p-2 rounded right-1/2 -top-10 opacity-0 peer-hover:opacity-100'>{isCopied ? 'Link copied!' :'Click to copy site link'}</span>
          </h4>
          <h4 className='font-light text-gray-500 mb-6 max-lg:text-center'>We find the court, you play the ball</h4>
          <p className='lg:w-11/12 md:w-2/3 mb-4 lg:float-end mx-auto dark:text-gray-300 text-gray-800 text-sm'>
            Ever found yourself wandering through a new city, searching for a place to shoot some hoops, only to be met with frustration?
            You're not alone. The struggle to find a basketball court is real!
          </p>
          <p className='mb-4 lg:float-end md:w-2/3 max-lg:mx-auto dark:text-gray-300 text-gray-800'>✨That's why we built BballConnect</p>
          <p className='lg:w-full md:w-2/3 max-lg:mx-auto mb-4 lg:float-end'>Instantly <span className="underline font-bold">discover</span> all nearby courts <br /> <span className='underline font-bold'>View</span> court details with a single click <br /> <span className='font-bold underline'>Contribute</span> by adding new courts</p>
          <p className='md:w-5/6 mb-8 float-end dark:text-gray-300 text-gray-800 text-sm'>Let us find you the courts, keep the focus on what truly matters <span className='font-semibold font-mono text-xl max-lg:block'>- playing ball!</span></p>
          <Link to="/courts" className='bg-pageLightColor hover:bg-pageLightColor/80 duration-150 hover:gap-2 py-3 px-8 rounded flex lg:float-end gap-4 justify-center items-center lg:text-lg text-pageDarkColor relative max-lg:w-max max-lg:mx-auto'>
            Let's find some courts!
            <IoArrowForward size={25} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage