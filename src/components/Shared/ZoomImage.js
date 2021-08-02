import React from "react";
import CursorZoom from "react-cursor-zoom";
import "../../App.css";
import {
  SideBySideMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from "react-image-magnifiers";

const ZoomImage = (props) => {
  //todo: calcular tamaños para el zoom
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
