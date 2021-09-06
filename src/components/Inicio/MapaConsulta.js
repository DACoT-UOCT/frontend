import React from "react";
import "../../App.css";
import { initialState as MapainitialState } from "../Shared/Reducers/MapaReducer";

import PopUp from "../Shared/PopUp";

import MarkerClusterGroup from "react-leaflet-markercluster";

import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";

/*Componente que muestra todas las instalaciones operativas, disponible desde 
la pagina de inicio */
const MapaConsulta = (props) => {
  const defaultCenter = MapainitialState.center;

  const buscar = (id) => {
    props.setOpen(false);
    const aux = "X" + id.slice(1, -1) + "0";
    props.buscar(aux);
  };

  //CLUSTERS
  const points = props.junctions.map((junction) => ({
    type: "Feature",
    properties: { cluster: false, jid: junction.jid },
    geometry: {
      type: "Point",
      coordinates: [junction.lon, junction.lat],
    },
  }));

  return (
    <>
      <PopUp
        title="Seleccione una instalación"
        open={props.open}
        setOpen={props.setOpen}
        map={true}>
        <div style={{ height: "70vh", width: "100%" }}>
          <MapContainer
            center={defaultCenter}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup
              showCoverageOnHover={true}
              disableClusteringAtZoom={16}>
              {points.map((point, i) => {
                const [longitude, latitude] = point.geometry.coordinates;

                return (
                  <Marker
                    key={i}
                    position={[latitude, longitude]}
                    eventHandlers={{
                      click: () => {
                        buscar(point.properties.jid);
                        // console.log("marker clicked", e);
                      },
                    }}>
                    <Tooltip> {point.properties.jid}</Tooltip>{" "}
                  </Marker>
                );
              })}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      </PopUp>
    </>
  );
};

export default React.memo(MapaConsulta);
