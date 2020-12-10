import React, { useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import Geocode from "react-geocode";
import { useImmerReducer } from "use-immer";
import {
  initialState as MapainitialState,
  reducer as Mapareducer,
} from "../Shared/Reducers/MapaReducer";
import { Button } from "reactstrap";
import { Dialog, DialogContent, Slide } from "@material-ui/core";

Geocode.setApiKey("AIzaSyC3iH8ViMlMPmTQTty-LE5RUimCVn_lh0Y");
Geocode.setLanguage("sp");
Geocode.setRegion("cl");
Geocode.enableDebug();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MapaConsulta = (props) => {
  const [stateMapa, dispatchMapa] = useImmerReducer(
    Mapareducer,
    MapainitialState
  );

  const dispatch = props.dispatch;
  const openMapa = props.open;
  const setOpenMapa = props.setOpen;
  const [isOpen, setIsOpen] = useState("");

  const abrirInfo = (jid) => {
    setIsOpen(jid);
  };

  const buscar = (id) => {
    setOpenMapa(false);
    setIsOpen("");
    props.buscar(id);
  };

  const MyMapComponent = withScriptjs(
    withGoogleMap((_props) => (
      <GoogleMap
        defaultZoom={stateMapa.initialZoom}
        defaultCenter={stateMapa.initialCenter}>
        {props.junctions.map((junction) => {
          return (
            <Marker
              position={{
                lat: junction.coordinates[0],
                lng: junction.coordinates[1],
              }}
              onClick={() => abrirInfo(junction.jid)}>
              {isOpen === junction.jid && (
                <InfoWindow onCloseClick={() => setIsOpen("")}>
                  <>
                    <div>{junction.jid}</div>
                    <Button onClick={() => buscar(junction.jid)}>Buscar</Button>
                  </>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
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
    },
    (error) => {
      console.error(error);
    }
  );

  return (
    <>
      <Dialog
        open={openMapa}
        fullWidth={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setOpenMapa(false);
          setIsOpen("");
        }}>
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

export default React.memo(MapaConsulta);
