import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { useRef } from "react";
import "../../App.css";

import Geocode from "react-geocode";
import { useImmerReducer } from "use-immer";
import { Label, Button } from "reactstrap";
import {
  initialState as MapainitialState,
  reducer as Mapareducer,
  defaultMapOptions,
} from "../Shared/Reducers/MapaReducer";
import PopUp from "../Shared/PopUp";
import useSupercluster from "use-supercluster";
import CustomMarker from "../Shared/CustomMarker";
import { GeocodingAPI_KEY, GoogleMapsAPI_KEY } from "../../API_KEYS.js";
import axios from "axios";

Geocode.setApiKey(GoogleMapsAPI_KEY);
Geocode.setLanguage("sp");
Geocode.setRegion("cl");
Geocode.enableDebug();

const Marker = ({ children }) => children;
const MapaFormulario = (props) => {
  const [stateMapa, dispatchMapa] = useImmerReducer(
    Mapareducer,
    MapainitialState
  );
  const dispatch = props.dispatch;
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(12);
  const mapRef = useRef();

  const [address, setAddress] = useState(props.address);
  const [coordinates, setCoordinates] = useState(props.pins);

  const onMapClick = (e) => {
    let lat = e.lat;
    let lng = e.lng;

    dispatchMapa({ type: "markerLat", payLoad: e.lat });
    dispatchMapa({ type: "markerLng", payLoad: e.lng });

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
          coordinates.find((element) => element.jid == props.jid) != undefined
        ) {
          //actualiza el pin que tiene el jid que se está actualizando
          var aux = [...coordinates];
          aux[
            aux.findIndex((element) => element.jid == props.jid)
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

        // if (props.controlador) {
        //   props.setPin([lat, lng]);
        //   dispatch({
        //     type: "controller",
        //     fieldName: "address_reference",
        //     payLoad: address,
        //   });
        // }
      });
  };

  //CLUSTERS
  const points = coordinates.map((junction) => ({
    type: "Feature",
    properties: { cluster: false, jid: junction.jid },
    geometry: {
      type: "Point",
      coordinates: [junction.coordinates[1], junction.coordinates[0]],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 70, maxZoom: 15 },
  });

  return (
    <>
      <PopUp
        title={"Seleccione una ubicación sobre el mapa"}
        open={props.open}
        setOpen={props.setOpen}
        map={true}>
        <div className="mapa-formulario-container">
          <div className="mapa-formulario">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: GoogleMapsAPI_KEY,
              }}
              onClick={(e) => onMapClick(e)}
              defaultCenter={stateMapa.center}
              defaultZoom={zoom}
              options={defaultMapOptions}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map }) => {
                mapRef.current = map;
              }}
              onChange={(e) => {
                setZoom(e.zoom);
                setBounds([
                  e.bounds.nw.lng,
                  e.bounds.se.lat,
                  e.bounds.se.lng,
                  e.bounds.nw.lat,
                ]);
              }}>
              {clusters.map((cluster) => {
                const [longitude, latitude] = cluster.geometry.coordinates;
                const { cluster: isCluster, point_count: pointCount } =
                  cluster.properties;

                if (isCluster) {
                  return (
                    <Marker
                      key={`cluster-${cluster.id}`}
                      lat={latitude}
                      lng={longitude}>
                      <div
                        className="cluster-marker"
                        style={{
                          width: `${10 + (pointCount / points.length) * 20}px`,
                          height: `${10 + (pointCount / points.length) * 20}px`,
                        }}
                        onClick={() => {
                          const expansionZoom = Math.min(
                            supercluster.getClusterExpansionZoom(cluster.id),
                            20
                          );

                          mapRef.current.setZoom(expansionZoom);
                          mapRef.current.panTo({
                            lat: latitude,
                            lng: longitude,
                          });
                        }}>
                        {pointCount}
                      </div>
                    </Marker>
                  );
                }

                return (
                  <CustomMarker
                    lat={latitude}
                    lng={longitude}
                    label={cluster.properties.jid}
                    gray={cluster.properties.jid !== props.jid}
                    buscar={() => {}}></CustomMarker>
                );
              })}
            </GoogleMapReact>
          </div>
          <div className="address-mapa-formulario">
            <div>
              <h3>
                {"Ubicación actual " + (props.junction ? props.jid : "")}{" "}
              </h3>
              <Label>
                {address == "" ? "Ubicación no registrada" : address}
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
                coordinates.find((element) => element.jid == props.jid) ==
                undefined
              }
              onClick={() => {
                dispatch({
                  type: "junctions",
                  index: props.index,
                  fieldName: "address_reference",

                  address: address,
                  coordinates: coordinates.find(
                    (element) => element.jid == props.jid
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
