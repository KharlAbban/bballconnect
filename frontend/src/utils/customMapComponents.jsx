import mapboxgl from "mapbox-gl"

export const userMarker = () => {
    new mapboxgl.Marker({
        className: "custom-user-marker"
    });
}
export const courtMarker = () => {
    new mapboxgl.Marker({
        className: "custom-court-marker"
    });
}
export const courtMarkerPopup = () => {
    new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: true,
        focusAfterOpen: true,
        className: "custom-court-popup"
    });
}