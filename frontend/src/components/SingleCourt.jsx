import React from 'react'
import { BsFillGeoFill } from 'react-icons/bs'
import { MdMyLocation } from 'react-icons/md'
import { HashLoader } from 'react-spinners'
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { FaUniversalAccess } from "react-icons/fa6";
import { MdGeneratingTokens } from "react-icons/md";
import { GiStreetLight } from "react-icons/gi";
import { MdEventSeat } from "react-icons/md";
import { GrRestroom } from "react-icons/gr";
import { GiBrickWall } from "react-icons/gi";
import { GiBasketballBasket } from "react-icons/gi";
import { MdClass } from "react-icons/md";

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
             <h3 className='mb-2 text-xl font-medium flex gap-2 items-center hover:underline'><MdOutlineDriveFileRenameOutline size={20} /> {courtDetailInfo.name} <MdVerified size={24} className='text-green-500' /></h3>
            <div className="flex mb-1 justify-between items-center">
              <p className='flex items-center gap-2 dark:text-gray-300 text-gray-800 font-light'><MdMyLocation className='text-yellow-600' size={15} /> {addressDetail}</p>
              <p className='flex items-center gap-2 dark:text-gray-300 text-gray-800 font-light'><BsFillGeoFill className='text-blue-600' size={15} /> {locationDetail}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className='flex items-center gap-2 dark:text-gray-300 text-gray-800 font-light'><MdGeneratingTokens className='text-teal-600' size={15} />Rating: 5.0</p>
              <p className='flex items-center gap-2 dark:text-gray-300 text-gray-800 font-light'><FaUniversalAccess className='text-orange-600' size={15} /> Public access</p>
            </div>
            <h4 className='underline'>Description:</h4>
            <p className='text-sm mb-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur iure, consequatur quam molestias quidem ea blanditiis repellendus vel iusto qui.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, similique.
            </p>

            <h4 className='underline mb-2'>More info:</h4>
            <div className="flex">
              <div className="mb-4 w-1/3 flex flex-col gap-3">
                <p className='flex items-center gap-2 dark:text-gray-300 text-gray-800 font-light'><GiBrickWall className='text-blue-400' size={15} />Surface: Cement</p>
                <p className='flex items-center gap-2 dark:text-gray-300 text-gray-800 font-light'><GiBasketballBasket className='text-blue-400' size={15} />Hoops: 2</p>
              </div>
              <div className="mb-4 w-1/3 flex flex-col gap-3">
                <p className='flex items-center gap-2 dark:text-gray-300 text-gray-800 font-light'><GiStreetLight className='text-blue-400' size={15} />Lighting: Available</p>
                <p className='flex items-center gap-2 dark:text-gray-300 text-gray-800 font-light'><MdEventSeat className='text-blue-400' size={15} />Seating: Available</p>
              </div>
              <div className="mb-4 w-1/3 flex flex-col gap-3">
                <p className='flex items-center gap-2 dark:text-gray-300 text-gray-800 font-light'><MdClass className='text-blue-400' size={15} />Type: Indoor</p>
                <p className='flex items-center gap-2 dark:text-gray-300 text-gray-800 font-light'><GrRestroom className='text-blue-400' size={15} />Restrooms: Available</p>
              </div>
            </div>
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