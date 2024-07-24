import React, { useEffect, useState } from 'react'
import { AllCourts, CourtMap, SingleCourt } from '../components';
import {useQuery} from "@tanstack/react-query"
import { getAllCourtsInfo, getCourtDetailInfo } from '../utils/courtRequestFunctions';
import {PanelGroup, Panel, PanelResizeHandle} from "react-resizable-panels"
import { handleWindowResizeForPanels } from "../utils/helperFunctions";
import { BiSolidToTop } from "react-icons/bi";

const CourtsPage = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(true);
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [areaPosition, setAreaPosition] = useState({lng: null, lat: null});
    const [courtDetailPosition, setCourtDetailPosition] = useState({lng: null, lat: null});
    const [userPosition, setUserPosition] = useState({lng: null, lat: null});

    useEffect(() => {
      handleWindowResizeForPanels(setIsSmallScreen);

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

      window.addEventListener("resize", () => handleWindowResizeForPanels(setIsSmallScreen));

      return () => window.removeEventListener("resize", () => handleWindowResizeForPanels(setIsSmallScreen));

    }, []);

    const {data: allCourts, isLoading: allCourtsLoading, isError: isCourtsError, error: courtsError} = useQuery({
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
    <PanelGroup className="h-full w-full relative" direction={isSmallScreen ? 'vertical' : 'horizontal'}>
      <Panel>
        {userPosition.lng != null && <CourtMap courtDetailPosition={courtDetailPosition} userPosition={userPosition} courts={allCourts} setSelectedCourt={setSelectedCourt} setAreaPosition={setAreaPosition} />}
      </Panel>
      <PanelResizeHandle className="lg:w-1 max-lg:h-1 bg-pageDarkColor dark:bg-gray-200 pointer-events-none" />
      <Panel defaultSize={40} minSize={40} maxSize={50} className="text-pageDarkColor dark:text-gray-100 p-2 font-light">
        <div className='h-full w-full overflow-y-scroll overflow-x-hidden relative pb-10'>
          {selectedCourt && <SingleCourt courtDetailInfo={courtDetailInfo} courtDetailLoading={courtDetailLoading} isCourtDetailError={isCourtDetailError} courtDetailError={courtDetailError} />}
          {selectedCourt && <span onClick={() => {document.querySelector("#singleCourtDiv").scrollIntoView({behavior: "smooth"});console.log("Item scrolled!")}} className="p-3 rounded-full hover:bg-pageLightColor duration-100 cursor-pointer fixed bottom-4 right-7 bg-pageLightColor/75">
            <BiSolidToTop size={22} />
          </span>}
          <AllCourts setCourtDetailPosition={setCourtDetailPosition} selectedCourt={selectedCourt} setSelectedCourt={setSelectedCourt} allCourts={allCourts} allCourtsLoading={allCourtsLoading} isCourtsError={isCourtsError} courtsError={courtsError} />
        </div>
      </Panel>
    </PanelGroup>
  )
}

export default CourtsPage