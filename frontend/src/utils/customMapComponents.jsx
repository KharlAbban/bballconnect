import mapboxgl from "mapbox-gl"

export const customUserMarker =  new mapboxgl.Marker(<p className="marker custom-user-marker"></p>);

export const customCourtMarker = () => {
    new mapboxgl.Marker({
        className: "custom-court-marker"
    });
}
export const customCourtMarkerPopup = () => {
    new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: true,
        focusAfterOpen: true,
        className: "custom-court-popup"
    });
}