import React from "react";
import CursorZoom from "react-cursor-zoom";
import "../../App.css";

const ZoomImage = (props) => {
  //todo: calcular tamaños para el zoom
  const size1 = 300;
  const size2 = 600;
  const size3 = 180;
  return (
    <div>
      <CursorZoom
        image={{
          src: props.img == undefined ? "/no_image.png" : props.img,
          width: size1,
          height: size1,
        }}
        zoomImage={{
          src: props.img == undefined ? "/no_image.png" : props.img,
          width: size2,
          height: size2,
        }}
        size={size3}
      />
    </div>
  );
};

export default ZoomImage;
