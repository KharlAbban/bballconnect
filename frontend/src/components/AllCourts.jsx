import React from 'react'
import { HashLoader } from 'react-spinners'
import { MdMyLocation } from "react-icons/md";
import { BsFillGeoFill } from "react-icons/bs";

const AllCourts = ({allCourts, allCourtsLoading, isCourtsError, courtsError, selectedCourt, setSelectedCourt, setCourtDetailPosition}) => {

  const showOnMap = (mapCoords, fsq_id) => {
    setCourtDetailPosition((oldValue) => {
      return {
          lng: mapCoords.longitude,
          lat: mapCoords.latitude,
      }
    });

    setSelectedCourt(() => {
      return {
        courtId: fsq_id,
        fromFsq: true
      }
    });
  }

  return (
    <div className='mt-2'>
        <h3 className='font-medium underline text-xl'>Available Courts near here</h3>
        <div className='w-full flex flex-col gap-4 py-2 pr-1 overflow-y-auto'>
            {allCourtsLoading && <HashLoader color='#d05722' size={60} />}
            {isCourtsError && <p>{JSON.stringify(courtsError.message)}</p>}
            {allCourts?.map(court => {
              const isSelected = selectedCourt?.courtId === court.fsq_id;
              // TODO: Add more detailed information about each court, such as address, opening hours, and contact information.
              const addressDetail = `${court.location.locality} ${court.location.region},  ${court.location.country}`;
              const locationDetail = `Lat: ${court.geocodes.main.latitude.toFixed(2)}, Long: ${court.geocodes.main.longitude.toFixed(2)}`;
              
              return <div key={court.fsq_id} className={`${isSelected ? 'dark:bg-orange-700 bg-orange-400' : 'dark:bg-gray-800 bg-gray-300'} rounded p-3 text-sm`}>
                  <h3 onClick={() => {showOnMap(court.geocodes.main, court.fsq_id)}} className='mb-1 text-lg cursor-pointer hover:text-orange-600 duration-100 font-medium'>{court.name}</h3>
                  <div className="flex mb-3 justify-between items-center">
                    <p className='flex items-center gap-2'><MdMyLocation /> {addressDetail}</p>
                    <p className='flex items-center gap-2'><BsFillGeoFill /> {locationDetail}</p>
                  </div>
                  <div className="flex justify-end">
                    ID: {court.fsq_id}
                  </div>
              </div>
            })}
        </div>
    </div>
  )
}

export default AllCourts