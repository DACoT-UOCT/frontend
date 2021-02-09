import React, { useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import { useImmerReducer } from "use-immer";
import { initialState as MapainitialState, reducer as Mapareducer } from "./Reducers/MapaReducer";
import {
  Dialog,
  DialogContent,
  Slide,
} from "@material-ui/core";

Geocode.setApiKey("AIzaSyC3iH8ViMlMPmTQTty-LE5RUimCVn_lh0Y");
Geocode.setLanguage("sp");
Geocode.setRegion("cl");
Geocode.enableDebug();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Mapa = (props) => {
  const [stateMapa, dispatchMapa] = useImmerReducer(Mapareducer, MapainitialState);
  const dispatch = props.dispatch;
  const myIndex = props.index;
  const openMapa = props.open;
  const setOpenMapa = props.setOpen;
  const junction = props.junction;
  const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={stateMapa.initialZoom}
        defaultCenter={stateMapa.initialCenter}
        onClick={onMapClick}>
        {stateMapa.isMarkerShown && (
          <Marker position={{ lat: stateMapa.markerLat, lng: stateMapa.markerLng }} />
        )}
      </GoogleMap>
    ))
  );

  const onMapClick = (e) => {
    dispatchMapa({ type: "isMarkerShown", payLoad: true });
    dispatchMapa({ type: "markerLat", payLoad: e.latLng.lat() });
    dispatchMapa({ type: "markerLng", payLoad: e.latLng.lng() });
    setOpenMapa(false);
  };

  Geocode.fromLatLng(stateMapa.markerLat, stateMapa.markerLng).then(
    (response) => {
      const address = response.results[0].formatted_address;
      dispatchMapa({ type: "location", payLoad: address });
      if (junction){
        dispatch({
          type: "junctions",
          index: myIndex,
          fieldName: "address_reference",
          payLoad: stateMapa.location,
        });
      }
      else{
        dispatch({
          type: "controller",
          fieldName: "address_reference",
          payLoad: stateMapa.location,
        })
      }
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
      <Dialog
        open={openMapa}
        fullWidth={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenMapa(false)}>
        <DialogContent>
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3iH8ViMlMPmTQTty-LE5RUimCVn_lh0Y&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default React.memo(Mapa);
