import React from 'react'
import { BsFillGeoFill } from 'react-icons/bs'
import { MdMyLocation } from 'react-icons/md'
import { HashLoader } from 'react-spinners'
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const SingleCourt = ({courtDetailInfo, courtDetailLoading, isCourtDetailError, setSelectedCourt}) => {
  const addressDetail = `${courtDetailInfo?.location.locality} ${courtDetailInfo?.location.region},  ${courtDetailInfo?.location.country}`;
  const locationDetail = `Lat: ${courtDetailInfo?.geocodes.main.latitude.toFixed(2)}, Long: ${courtDetailInfo?.geocodes.main.longitude.toFixed(2)}`;


  return (
    <div className='' id='singleCourtDiv'>
        <h3 className='text-lg flex justify-between w-full items-center pr-4'>
          <span className='underline'>Court Detail</span>
          <button className='rounded p-1 bg-gray-500 hover:bg-gray-400 duration-150' onClick={()=> {setSelectedCourt(null)}}>
            <IoMdClose />
          </button>
        </h3>

        {courtDetailLoading &&
          <div className='w-1/2 py-2 mx-auto items-center justify-center flex flex-col gap-5'>
            <HashLoader color='#d05722' size={60} />
            <h3 className='font-playwright'>Getting more info on court...</h3>
          </div>
        }
        {isCourtDetailError &&
          <div className='w-1/2 py-2 mx-auto justify-center items-center gap-4 min-h-32 flex flex-col'>
            <p>Bricks! An error occured while getting court details! <br /> Wait as we refetch the data, or</p>
            <button onClick={() => {location.reload()}} className='py-2 w-full px-5 rounded bg-pageLightColor/80 hover:scale-95 hover:bg-pageLightColor duration-0 shadow'>Refresh page ♻️</button>
            <p className="text-sm">Note: You need to reselect this court if you refresh the page!</p>
          </div>
        }
        
        {courtDetailInfo &&
          <div className='p-3 rounded'>
             <h3 className='mb-2 text-xl font-medium flex gap-2 items-center'><MdOutlineDriveFileRenameOutline size={22} /> {courtDetailInfo.name}</h3>
            <div className="flex mb-1 justify-between items-center">
              <p className='flex items-center gap-2 dark:text-gray-300 text-gray-800 font-light'><MdMyLocation size={15} /> {addressDetail}</p>
              <p className='flex items-center gap-2 dark:text-gray-300 text-gray-800 font-light'><BsFillGeoFill size={15} /> {locationDetail}</p>
            </div>
            <p className='mb-3 flex gap-2 dark:text-gray-300 text-gray-800 font-light items-center'><FaHashtag size={15} /> {courtDetailInfo.fsq_id}</p>
            <h4 className='underline'>More info:</h4>
            <p className='text-sm mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure, consequatur quam molestias quidem ea blanditiis repellendus vel iusto qui.</p>
            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure, consequatur quam molestias quidem ea blanditiis repellendus vel iusto qui.</p>
            <div className='w-full no-scrollbar flex items-center overflow-x-auto gap-4 overflow-y-hidden mt-6 py-1'>
              <img src="/logo.png" alt="court image" className='h-24 rounded border border-white' />
              <img src="/logo.png" alt="court image" className='h-24 rounded border border-white' />
              <img src="/logo.png" alt="court image" className='h-24 rounded border border-white' />
              <img src="/logo.png" alt="court image" className='h-24 rounded border border-white' />
              <img src="/logo.png" alt="court image" className='h-24 rounded border border-white' />
            </div>
          </div>
        }

        <hr className='mb-2 mt-16' />
    </div>
  )
}

export default SingleCourt