import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

const RouteError = () => {
  const errorObject = useRouteError();

  return (
    <div className='relative h-full w-full flex flex-col justify-center items-center bg-orange-400 text-xl gap-6'>
        {errorObject.status} {errorObject.message}
        <Link to="/" className='font-semibold bg-orange-700 py-2 px-4 hover:bg-orange-600 duration-100 rounded'>Go home</Link>
    </div>
  )
}

export default RouteError