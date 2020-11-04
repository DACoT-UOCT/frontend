import React, {useState} from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import { compose, withProps, withStateHandlers } from "recompose";

Geocode.setApiKey("AIzaSyC3iH8ViMlMPmTQTty-LE5RUimCVn_lh0Y");
Geocode.setLanguage("sp");
Geocode.setRegion("cl");
Geocode.enableDebug();

const Mapa = () => {

  const [isMarkerShown, setMarkerShown] = useState(null);
  const [markerLat, setMarkerLat] = useState(null);
  const [markerLng, setMarkerLng] = useState(null);

  Geocode.fromLatLng("-33.447763", "-70.645001").then(
    response => {
      const address = response.results[0].formatted_address;
      console.log(address);
    },
    error => {
      console.error(error);
    }
  )

  const onMapClick = ({x, y, lat, lng, event}) => {
    console.log(x, y, lat, lng, event);
    setMarkerLat(lat);
    setMarkerLng(lng);
  }

  const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: -33.447763, lng: -70.645001 }}
    onClick={onMapClick}
  >
    {props.isMarkerShown && <Marker position={{ lat: -33.447763, lng: -70.645001 }} />}
  </GoogleMap>
  ))

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
    <MyMapComponent
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3iH8ViMlMPmTQTty-LE5RUimCVn_lh0Y&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};


export default Mapa;
