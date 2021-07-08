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
        if (props.junction) {
          dispatch({
            type: "junctions",
            index: props.index,
            fieldName: "address_reference",
            address: address,
            coordinates: [lat, lng],
          });
        }
        if (props.controlador) {
          props.setPin([lat, lng]);
          dispatch({
            type: "controller",
            fieldName: "address_reference",
            payLoad: address,
          });
        }
      });
  };

  //CLUSTERS
  const points = props.pins.map((junction) => ({
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
                        {pointCount / 2}
                      </div>
                    </Marker>
                  );
                }

                return (
                  <CustomMarker
                    lat={latitude}
                    lng={longitude}
                    label={cluster.properties.jid}
                    gray={
                      props.junction && cluster.properties.jid !== props.jid
                    }
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
                {props.address == ""
                  ? "Ubicación no registrada"
                  : props.address}
              </Label>
            </div>
            <Button
              outline
              color="secondary"
              size="lg"
              onClick={() => props.setOpen(false)}>
              Guardar
            </Button>
          </div>
        </div>
      </PopUp>
    </>
  );
};

export default React.memo(MapaFormulario);
