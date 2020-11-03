import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { compose, withProps, withStateHandlers } from "recompose";

const Mapa = () => {

  const MyMapComponent = compose(
    withStateHandlers(() => ({
      isMarkerShown: false,
      markerPosition: null
    }), {
      onMapClick: ({ isMarkerShown }) => (e) => ({
          markerPosition: e.latLng,
          isMarkerShown: true
      }),
      onSecondMapClick: ({ isMarkerShown }) => (e) => ({
        markerPosition: null,
        isMarkerShown: false
    }),
    }),
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC3iH8ViMlMPmTQTty-LE5RUimCVn_lh0Y&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )
  ((props) =>
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: -33.447763, lng: -70.645001 }}
      onClick={!props.isMarkerShown && props.onMapClick || props.isMarkerShown && props.onSecondMapClick}
    >
      {props.isMarkerShown && <Marker position={props.markerPosition} />}
      
    </GoogleMap>
    
  );

  return (
    <MyMapComponent/>
  );
};


export default Mapa;
