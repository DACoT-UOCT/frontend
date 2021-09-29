import React from "react";
import "../../App.css";
import { initialState as MapainitialState } from "../Shared/Reducers/MapaReducer";

import PopUp from "../Shared/PopUp";

import MarkerClusterGroup from "react-leaflet-markercluster";

import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { LayersControl } from "react-leaflet";

/*Componente que muestra todas las instalaciones operativas, disponible desde 
la pagina de inicio */

const MapLayer = (props) => {
  return (
    <LayersControl.Overlay checked={props.checked} name={props.name}>
      <MarkerClusterGroup
        showCoverageOnHover={true}
        disableClusteringAtZoom={16}>
        {props.points.map((point, i) => {
          const [longitude, latitude] = point.geometry.coordinates;

          return (
            <Marker
              key={i}
              position={[latitude, longitude]}
              eventHandlers={{
                click: () => {
                  props.buscar(point.properties.jid);
                },
              }}>
              <Tooltip> {point.properties.jid}</Tooltip>{" "}
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </LayersControl.Overlay>
  );
};

const MapaConsulta = (props) => {
  const defaultCenter = MapainitialState.center;
  const comunas = Array.from(
    new Set(
      props.junctions.map((junction) => {
        return junction.commune;
      })
    )
  );
  const redes = Array.from(
    new Set(
      props.junctions.map((junction) => {
        return junction.jid.slice(1, 4);
      })
    )
  );
  const buscar = (id) => {
    props.setOpen(false);
    const aux = "X" + id.slice(1, -1) + "0";
    props.buscar(aux);
  };

  //CLUSTERS
  const points = props.junctions.map((junction) => ({
    type: "Feature",
    properties: {
      cluster: false,
      jid: junction.jid,
      commune: junction.commune,
    },
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
        <div>
          <div className="map-consulta-wrap">
            <MapContainer
              center={defaultCenter}
              zoom={12}
              className="map-consulta-map"
              scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LayersControl position="topright">
                <MapLayer
                  checked={true}
                  points={points}
                  name={"Mostrar todas las redes"}
                  buscar={buscar}
                />
                {redes.map((red) => {
                  return (
                    <div key={red}>
                      <MapLayer
                        points={points.filter((point) => {
                          return point.properties.jid.slice(1, 4) === red;
                        })}
                        name={"Red: " + red}
                        buscar={buscar}
                      />
                    </div>
                  );
                })}
              </LayersControl>
              <LayersControl position="topright">
                {comunas.map((comuna) => {
                  return (
                    <div key={comuna}>
                      <MapLayer
                        points={points.filter((point) => {
                          return point.properties.commune === comuna;
                        })}
                        name={comuna}
                        buscar={buscar}
                      />
                    </div>
                  );
                })}
              </LayersControl>
            </MapContainer>
          </div>
        </div>
      </PopUp>
    </>
  );
};

export default React.memo(MapaConsulta);
