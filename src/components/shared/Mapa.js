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
  const [markerPosition, setMarkerPosition] = useState(null);

  Geocode.fromLatLng("-33.447763", "-70.645001").then(
    response => {
      const address = response.results[0].formatted_address;
      console.log(address);
    },
    error => {
      console.error(error);
    }
  )

  const MyMapComponent = compose(
    withStateHandlers(() => ({
      isMarkerShown: false,
      markerPosition: null,
      texto: "",
    }), {
      onMapClick: () => (e) => ({
          markerPosition: e.latLng,
          isMarkerShown: true,
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
      {props.isMarkerShown && <Marker position={props.markerPosition}/>}
    </GoogleMap>
  );


  return (
    <>
    <MyMapComponent/>
    
    </>
  );
};


export default Mapa;
