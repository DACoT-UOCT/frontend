import React, { useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import { useImmerReducer } from "use-immer";
import { initialState, reducer } from "./Reducers/MapaReducer";

Geocode.setApiKey("AIzaSyC3iH8ViMlMPmTQTty-LE5RUimCVn_lh0Y");
Geocode.setLanguage("sp");
Geocode.setRegion("cl");
Geocode.enableDebug();

const Mapa = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={state.initialZoom}
        defaultCenter={state.initialCenter}
        onClick={onMapClick}>
        {state.isMarkerShown && (
          <Marker position={{ lat: state.markerLat, lng: state.markerLng }} />
        )}
      </GoogleMap>
    ))
  );

  const onMapClick = (e) => {
    dispatch({ type: "isMarkerShown", payLoad: true });
    dispatch({ type: "markerLat", payLoad: e.latLng.lat() });
    dispatch({ type: "markerLng", payLoad: e.latLng.lng() });
  };

  Geocode.fromLatLng(state.markerLat, state.markerLng).then(
    (response) => {
      const address = response.results[0].formatted_address;
      dispatch({ type: "location", payLoad: address });
    },
    (error) => {
      console.error(error);
    }
  );

  /*const MyMapComponent = compose(
    withStateHandlers(() => ({
      isMarkerShown: false,
      markerPosition: null,
      texto: "",
    }), {
      onMapClick: () => (e) => ({
          markerLat: e.latLng.lat(),
          markerLng: e.latLng.lng(),
          isMarkearrShown: true,
          texto: e.latLng
      }),
      onSecondMapClick: () => (e) => ({
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
    withGoogleMap,
  )
  ((props) =>
    <GoogleMap
      zoom={14}
      defaultCenter={{ lat: -33.447763, lng: -70.645001 }}
      onClick={props.onMapClick}
    >
      {props.isMarkerShown && <Marker position={{lat:props.markerLat,lng:props.markerLng}}/>}
      {console.log(props.markerLat)}
    </GoogleMap>
  );*/

  return (
    <>
      <MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3iH8ViMlMPmTQTty-LE5RUimCVn_lh0Y&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <h6>{state.location}</h6>
    </>
  );
};

export default React.memo(Mapa);
