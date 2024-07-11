import { Link } from 'react-router-dom'

const HomeComponent = () => {
  return (
    <div className='h-screen w-screen grid place-items-center text-white bg-gradient-to-tr from-blue-500 to-yellow-500'>
        <Link to="/explore" className='text-2xl hover:text-gray-700 duration-100 transition-all hover:underline'>Explore courts</Link>
        <Link to="/protected" className='text-2xl hover:text-gray-700 duration-100 transition-all hover:underline'>Protected route</Link>
    </div>
  )
}

export default HomeComponent