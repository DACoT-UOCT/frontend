export const initialState = {
    initialCenter: { lat: -33.447763, lng: -70.645001 },
    initialZoom: 15,
    markerLat: null,
    markerLng: null,
    location: null,
    isMarkerShown: false,
    markers: [],
};

export function reducer(draft, action) {
    switch (action.type) {
      default:
        draft[action.type] = action.payLoad;
        return;
    }
  }