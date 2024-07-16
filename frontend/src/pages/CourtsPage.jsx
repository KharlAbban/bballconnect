import React, { useEffect, useState } from 'react'
import { CourtMap } from '../components';
import {useQuery} from "@tanstack/react-query"
import { getAllCourtsInfo, getCourtDetailInfo } from '../utils/courtRequestFunctions';
import {HashLoader} from "react-spinners"

const CourtsPage = () => {
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [areaPosition, setAreaPosition] = useState({lng: null, lat: null});
    const [userPosition, setUserPosition] = useState({lng: null, lat: null});

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {longitude, latitude} = position.coords;
                setUserPosition((oldValue) => {
                    return {
                        lng: longitude,
                        lat: latitude,
                    }
                });
                setAreaPosition((oldValue) => {
                    return {
                        lng: longitude,
                        lat: latitude,
                    }
                });
            },
            (error) => {
                alert("Unable to get your location!");
                setUserPosition((oldValue) => {
                    return {
                        lng: -0.7,
                        lat: 4,
                    }
                });
            },
            {
                enableHighAccuracy: true,
            }
        );
      } else {
        alert("Please allow location! Some features depend on this!");
        setUserPosition((oldValue) => {
            return {
                lng: -0.7,
                lat: 4,
            }
        });
    }
    }, []);

    const {data: allCourts, isLoading: allCourtsLoading, isError, error} = useQuery({
      queryKey: ['courts', {areaLongitude: areaPosition.lng,areaLatitude: areaPosition.lat}],
      queryFn: getAllCourtsInfo,
      enabled: !!areaPosition.lng && !!areaPosition.lat,
      staleTime: 1000 * 60 * 30, // 30 minutes
    });

    const {data:courtDetailInfo, isLoading: courtDetailLoading, isError: isCourtDetailError, error: courtDetailError} = useQuery({
      queryKey: ['courtDetails', selectedCourt],
      queryFn: getCourtDetailInfo,
      enabled:!!selectedCourt,
      staleTime: Infinity
    });

  return (
    <div className='w-full h-full flex max-lg:flex-col overflow-hidden relative gap-0'>
        <div className='w-full lg:w-2/3 bg-grey-300 h-1/2 lg:h-full overflow-hidden'>
          {userPosition.lng != null && <CourtMap userPosition={userPosition} courts={allCourts} setSelectedCourt={setSelectedCourt} setAreaPosition={setAreaPosition} />}
        </div>
        <div className='w-full lg:w-1/3 bg-teal-500 h-1/2 lg:h-full p-3 overflow-y-auto'>
          <hr className='my-4' />
          <h3 className='font-semibold underline text-lg'>Court Details</h3>
          {courtDetailInfo == null && <p>No court selected</p>}
          {courtDetailLoading && <HashLoader />}
          {isCourtDetailError && <p>{JSON.stringify(courtDetailError.message)}</p>}
          {courtDetailInfo && <p className='bg-gray-100 p-1'>{JSON.stringify(courtDetailInfo)}</p>}
          <hr className='my-4' />
          <h3 className='font-semibold underline text-lg'>Available Courts near area</h3>
          {allCourtsLoading && <HashLoader />}
          {isError && <p>{JSON.stringify(error.message)}</p>}
          {allCourts?.map(court => (
            <div key={court.fsq_id} className='mb-4 bg-gray-200'>
              <h3>{court.name}</h3>
              <p>{JSON.stringify(court.geocodes.main)}</p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default CourtsPage