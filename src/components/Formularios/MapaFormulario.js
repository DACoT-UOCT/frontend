import React, { useState } from "react";
import "../../App.css";
import Geocode from "react-geocode";
import { useImmerReducer } from "use-immer";
import { Label, Button } from "reactstrap";
import {
  initialState as MapainitialState,
  reducer as Mapareducer,
} from "../Shared/Reducers/MapaReducer";
import PopUp from "../Shared/PopUp";
import { GeocodingAPI_KEY, GoogleMapsAPI_KEY } from "../../API_KEYS.js";
import axios from "axios";

import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";

let DefaultIcon = L.icon({
  iconUrl: "/imagenes/semaforo.png",
  shadowUrl: null,
  iconSize: new L.Point(30, 30),
});

L.Marker.prototype.options.icon = DefaultIcon;

Geocode.setApiKey(GoogleMapsAPI_KEY);
Geocode.setLanguage("sp");
Geocode.setRegion("cl");
Geocode.enableDebug();

//MAPA USADO PARA VISUALIZAR E INGRESAR LA UBICACION DE UN JUNCTION EN EL FORMULARIO
//TAMBIEN SE ENCARGA DE ENCONTRAR EL NOMBRE DE LA CALLE DE LA UBICACION
const MapaFormulario = (props) => {
  const [stateMapa, dispatchMapa] = useImmerReducer(
    Mapareducer,
    MapainitialState
  );
  const dispatch = props.dispatch;
  const [address, setAddress] = useState(props.address);
  const [coordinates, setCoordinates] = useState(props.pins);

  const onMapClick = (e) => {
    const { lat, lng } = e.latlng;

    //GUARDA LAS COORDENADAS
    dispatchMapa({ type: "markerLat", payLoad: e.lat });
    dispatchMapa({ type: "markerLng", payLoad: e.lng });

    //BUSCA EL NOMBRE DE LA CALLE Y ACTUALIZA OBUCACION DEL PIN
    axios
      .get(
        "http://www.mapquestapi.com/geocoding/v1/reverse?key=" +
          GeocodingAPI_KEY +
          "&location=" +
          lat +
          "," +
          lng +
          "&includeRoadMetadata=true&includeNearestIntersection=true"
      )
      .then((data) => {
        let respuesta = data.data.results[0].locations[0];
        let address = respuesta.street + " - " + respuesta.adminArea5;
        dispatchMapa({ type: "location", payLoad: address });
        setAddress(address);
        if (
          coordinates.find((element) => element.jid === props.jid) !== undefined
        ) {
          //actualiza el pin que tiene el jid que se está actualizando
          var aux = [...coordinates];
          aux[
            aux.findIndex((element) => element.jid === props.jid)
          ].coordinates = [lat, lng];
          setCoordinates(aux);
        } else {
          //si no existe un pin para el Jid, agrega uno nuevo
          setCoordinates([
            ...coordinates,
            {
              jid: props.jid,
              coordinates: [lat, lng],
            },
          ]);
        }
      });
  };

  //LISTA DE PINES QUE SE RENDERIZAN EN EL MAPA
  const points = coordinates.map((junction) => ({
    type: "Feature",
    properties: { cluster: false, jid: junction.jid },
    geometry: {
      type: "Point",
      coordinates: [junction.coordinates[1], junction.coordinates[0]],
    },
  }));

  const OnMapClick = () => {
    useMapEvent("click", (e) => {
      onMapClick(e);
    });
    return null;
  };

  return (
    <>
      <PopUp
        title={"Seleccione una ubicación haciendo click sobre el mapa"}
        open={props.open}
        setOpen={props.setOpen}
        map={true}>
        <div className="mapa-formulario-container">
          <div className="mapa-formulario">
            <MapContainer
              center={stateMapa.center}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <OnMapClick />

              {points.map((point, i) => {
                const [longitude, latitude] = point.geometry.coordinates;

                return (
                  <Marker key={i} position={[latitude, longitude]}>
                    <Tooltip> {point.properties.jid}</Tooltip>{" "}
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
          <div className="address-mapa-formulario">
            <div>
              <h3>{"Ubicación actual " + props.jid} </h3>
              <Label>
                {address === "" ? "Ubicación no registrada" : address}
              </Label>
            </div>
            <Button
              color="secondary"
              size="lg"
              onClick={() => props.setOpen(false)}>
              Cancelar
            </Button>
            <Button
              color="success"
              size="lg"
              disabled={
                coordinates.find((element) => element.jid === props.jid) ===
                undefined
              }
              onClick={() => {
                dispatch({
                  type: "junctions",
                  index: props.index,
                  fieldName: "address_reference",

                  address: address,
                  coordinates: coordinates.find(
                    (element) => element.jid === props.jid
                  ).coordinates,
                });
                props.setOpen(false);
              }}>
              Guardar
            </Button>
          </div>
        </div>
      </PopUp>
    </>
  );
};

export default React.memo(MapaFormulario);
