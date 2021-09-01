export const initialState = {
  center: { lat: -33.447763, lng: -70.645001 },
  markerLat: null,
  markerLng: null,
  location: null,
  isMarkerShown: false,
  markers: [],
};

export const defaultMapOptions = {
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ],
};
export function reducer(draft, action) {
  switch (action.type) {
    default:
      draft[action.type] = action.payLoad;
      return;
  }
}
