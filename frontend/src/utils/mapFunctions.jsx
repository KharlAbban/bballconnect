// function to animate map to new coordintes
export const animateMap = (mapRef, longitude, latitude, zoom) => {
    console.log(longitude, latitude, zoom);

    mapRef.current.easeTo({
        center: [longitude, latitude],
        duration: 5000,
        pitch: 3,
        zoom: zoom
    });
}