import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from "mapbox-gl";
import { animateMap } from '../utils/mapFunctions';
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_MAPS_PUBLIC_TOKEN;

const Explore = () => {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const [mapCenter, setMapCenter] = useState({lng: -0.96, lat: 6.66});
    const [mapZoom, setMapZoom] = useState(6.35);
    const [userPos, setUserPos] = useState({lng: -0.96, lat: 6.66});
    const userMarker = new mapboxgl.Marker();

    useEffect(() => {
        let timeoutId;     

        // if map initalized, return / initialize map only once
        if (mapRef.current) return;

        // create map here
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [0, 0],
            zoom: 4
        });

        // Map Event Handlers
        // do something when map loads
        mapRef.current.on("load", () => {

            // display user location on map
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const {longitude, latitude} = position.coords;
                        setMapCenter((oldValue) => {
                            return {
                                lng: longitude,
                                lat: latitude,
                            }
                        });
                        setUserPos((oldValue) => {
                            return {
                                lng: longitude,
                                lat: latitude,
                            }
                        });
                        setMapZoom(6);
                        timeoutId = setTimeout(animateMap(mapRef, longitude, latitude, 14), 1500);
                        userMarker.setLngLat([longitude, latitude]).addTo(mapRef.current);
                    },
                    (error) => {
                        alert("Unable to get your location!");
                        setMapCenter((oldValue) => {
                            return {
                                lng: -0.7,
                                lat: 4,
                            }
                        });
                        setMapZoom(4);
                        timeoutId = setTimeout(animateMap(mapRef, mapCenter.lng, mapCenter.lat, mapZoom), 1500);
                    },
                    {
                        enableHighAccuracy: true,
                        maximumAge: 0,
                        timeout: 5000
                    }
                );
            } else {
                alert("Please allow location! Some features depend on this!");
                setMapCenter((oldValue) => {
                    return {
                        lng: -0.7,
                        lat: 4,
                    }
                });
                setMapZoom(4);
                timeoutId = setTimeout(animateMap(mapRef, mapCenter.lng, mapCenter.lat, mapZoom), 1500);
            }

        });
        // set new coordinates when map is moved
        mapRef.current.on("move", () => {
            setMapCenter((oldValue) => {
                return {
                    lng: mapRef.current.getCenter().lng.toFixed(4),
                    lat: mapRef.current.getCenter().lat.toFixed(4),
                }
            });
            setMapZoom(mapRef.current.getZoom().toFixed(2));
        });
        // Log something on map click
        mapRef.current.on("click", (Event) => {
            console.log(Event);
        });

        // clear timeout
        return () => {
            clearTimeout(timeoutId);
        }
    }, []);

    useEffect(() => {
        let positionWatchId;

        // track user location on map
        if (navigator.geolocation) {
            positionWatchId = navigator.geolocation.watchPosition(
                (position) => {
                    const {longitude, latitude} = position.coords;
                    console.log(longitude, latitude);
                    setUserPos((oldValue) => ({
                        lng: longitude,
                        lat: latitude,
                    }));
                    userMarker.setLngLat([longitude, latitude]).addTo(mapRef.current);
                    
                    // if (mapRef.current) {
                    //     mapRef.current.flyTo({
                    //         center: [longitude, latitude],
                    //         zoom: 14,
                    //         essential: true, // This animation must be essential for tracking user's location.
                    //     });
                    // }
                },
                (error) => console.error("Error tracking user movement", error.message),
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 5000
                }
            );
        } else {
            alert("Please allow location! Some features depend on this!");
            console.error("Please allow location! Some features depend on this!");
        }

        return () => navigator.geolocation.clearWatch(positionWatchId);
    }, [mapRef]);


  return (
    <div className='relative flex max-lg:flex-col gap-0 h-screen w-screen overflow-hidden'>
        <div className='absolute top-4 left-4 z-20 px-4 py-1 rounded shadow text-sm bg-white text-black'>
            <p>Long: {mapCenter.lng}, Lat: {mapCenter.lat}</p>
        </div>
        <div className='w-screen h-2/3 overflow-hidden lg:h-screen lg:w-2/3' ref={mapContainerRef}></div>
        <div className='shadow w-screen rounded-t-lg lg:rounded-none h-1/3 lg:h-screen lg:w-1/3 bg-blue-500 p-3' />
    </div>
  )
}

export default Explore