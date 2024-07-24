import React, { useEffect, useRef } from 'react'
import mapboxgl from "mapbox-gl"
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { animateMap, getMapDistance } from '../utils/mapFunctions';
import { customUserMarker } from '../utils/customMapComponents';
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_MAPS_PUBLIC_TOKEN;

const CourtMap = ({userPosition, courts, setSelectedCourt, setAreaPosition, courtDetailPosition}) => {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    let mapCenter = {lng: null, lat: null}

    // const userMarker = new mapboxgl.Marker();
    const userMarker = customUserMarker;
    const geocoderSearchBar = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Search courts by location',
        country: 'GH',
        language: 'en'
    })

    // First effect to set up map
    useEffect(() => {
        let positionWatchId;

        // if map is already initialized, return
        if (mapRef.current) return;

        // create map here
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            // style: "mapbox://styles/khvngkharl/clyykf9gy00cg01nv2ah21hni",
            center: [0, 0],
            zoom: 4,
        });

        // add geocoding functionality
        mapRef.current.addControl(geocoderSearchBar);
        
        // Event handler for Geocoder
        geocoderSearchBar.on('result', ({result}) => {
            setAreaPosition(() => ({
                lng: result.center[0],
                lat: result.center[1]
            }))
        });

        // Event handlers for Map
        mapRef.current.on('style.load', () => {
            let lightPreset = 'day'
            const h = new Date().getHours();

            if (h < 4) {
                lightPreset = 'night'
            } else if (h < 5) {
                lightPreset = 'dawn'
            } else if (h < 16) {
                lightPreset = 'day'
            } else {
                lightPreset = 'night'
            }
            mapRef.current.setConfigProperty('basemap', 'lightPreset', lightPreset);
        });

        mapRef.current.on("load", () => {
            mapCenter = {lng: userPosition.lng, lat: userPosition.lat};
            animateMap(mapRef, userPosition.lng, userPosition.lat, 16);
            userMarker.setLngLat([userPosition.lng, userPosition.lat]).addTo(mapRef.current);
            
            if (navigator.geolocation) {
                positionWatchId = navigator.geolocation.watchPosition(
                    (position) => {
                        const {longitude, latitude} = position.coords;
                        userMarker.setLngLat([longitude, latitude]).addTo(mapRef.current);
                        // calculate user position and do something
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
        });

        mapRef.current.on("moveend", () => {
            if (mapCenter.lng == null) return;

            // console.log("Map center:", mapRef.current.getCenter());
            const {lng: currLong, lat: currLat} = mapRef.current.getCenter();
            const distance = getMapDistance(mapCenter.lng, mapCenter.lat, currLong, currLat);
            // console.log("Distance:", distance);

            if (distance > 8) {
                mapCenter = {lng: currLong, lat: currLat};
                setAreaPosition(() => ({lng: currLong, lat: currLat}));
            }
        });

        return () => {
            navigator.geolocation.clearWatch(positionWatchId)
        }

    }, []);

    useEffect(() => {
        if (!mapRef.current) return;

        courts?.forEach(court => {
            const marker = new mapboxgl.Marker()
            marker.setLngLat([court.geocodes.main.longitude, court.geocodes.main.latitude]).addTo(mapRef.current);
            marker.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(court.name));
            marker.getElement().addEventListener("click", () => {
            court?.fsq_id ? setSelectedCourt({courtId: court.fsq_id, fromFsq: true}): setSelectedCourt({courtId: court.id, fromFsq: false});
           })
        })
    }, [courts]);

    (mapRef.current && userPosition?.lng != null) && animateMap(mapRef, courtDetailPosition.lng, courtDetailPosition.lat, 17);


  return (
    <div ref={mapContainerRef} className='bg-gray-500 w-full h-full flex justify-center items-center'>
        <p className='text-3xl font-playwright'>Loading map ....</p>
    </div>
  )
}

export default React.memo(CourtMap);