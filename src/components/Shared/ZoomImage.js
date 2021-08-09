import React from "react";
import "../../App.css";
import { SideBySideMagnifier } from "react-image-magnifiers";

//COMPONENTE QUE RENDERIZA UNA IMAGEN, LA CUAL HACE ZOOM SI PASA EL MOUSE POR ENCIMA
const ZoomImage = (props) => {
  return (
    <div>
      <SideBySideMagnifier
        className="zoom-image"
        imageSrc={props.img}
        largeImageSrc={props.img}
        alwaysInPlace={true}
        overlayOpacity={0.5}
        zoomPosition="right"
        fillAvailableSpace={false}
        zoomContainerBorder="1px solid #ccc"
        zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,.5)"
      />
    </div>
  );
};

export default ZoomImage;
