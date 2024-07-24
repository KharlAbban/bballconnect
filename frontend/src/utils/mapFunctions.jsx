// function to animate map to new coordintes
export const animateMap = (mapRef, longitude, latitude, zoom) => {

    mapRef.current.easeTo({
        center: [longitude, latitude],
        duration: 3500,
        pitch: 10,
        zoom: zoom
    });
}

// function to calculate distance in kilometers between two coordinates
// using haversine formula
export const getMapDistance = (mapLong, mapLat, currLong, currLat) => {
    const earthRadius = 6371; // earth radius in kilometers
    const latOneRad = mapLat * Math.PI / 180; // latitude in radians
    const latTwoRad = currLat * Math.PI / 180; // latitude in radians
    const latDiffRad = (currLat - mapLat) * Math.PI / 180; // latitude difference in radians
    const longDiffRad = (currLong - mapLong) * Math.PI / 180; // longitude difference in radians

    const intermedValue = Math.sin(latDiffRad / 2) * Math.sin(latDiffRad / 2) + Math.cos(latOneRad) * Math.cos(latTwoRad) * Math.sin(longDiffRad / 2) * Math.sin(longDiffRad / 2);

    const rootIntermedValue = 2 * Math.atan2(Math.sqrt(intermedValue), Math.sqrt(1 - intermedValue));

    const distanceInKm = Math.floor(earthRadius * rootIntermedValue);

    return distanceInKm;
}