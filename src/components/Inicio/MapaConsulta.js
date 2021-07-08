import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { useRef } from "react";
import "../../App.css";
import { useImmerReducer } from "use-immer";
import {
  initialState as MapainitialState,
  reducer as Mapareducer,
  defaultMapOptions,
} from "../Shared/Reducers/MapaReducer";

import PopUp from "../Shared/PopUp";
import useSupercluster from "use-supercluster";
import CustomMarker from "../Shared/CustomMarker";
import { GoogleMapsAPI_KEY } from "../../API_KEYS.js";

const Marker = ({ children }) => children;
const MapaConsulta = (props) => {
  const [stateMapa, dispatchMapa] = useImmerReducer(
    Mapareducer,
    MapainitialState
  );
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);
  const mapRef = useRef();

  const buscar = (id) => {
    props.setOpen(false);
    // setIsOpen("");
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

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 70, maxZoom: 15 },
  });
  // {
  //   "jid": "J031411",
  //   "coordinates": [
  //     -33.554039,
  //     -70.632627
  //   ]
  // }

  return (
    <>
      <PopUp
        title="Seleccione una instalación"
        open={props.open}
        setOpen={props.setOpen}
        map={true}>
        <div style={{ height: "70vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: GoogleMapsAPI_KEY,
            }}
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
                        mapRef.current.panTo({ lat: latitude, lng: longitude });
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
                  buscar={buscar}></CustomMarker>
              );
            })}
          </GoogleMapReact>
        </div>
      </PopUp>
    </>
  );
};

export default React.memo(MapaConsulta);
