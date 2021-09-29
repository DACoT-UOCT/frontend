import React from "react";
import "../../../App.css";
import TextareaAutosize from "react-textarea-autosize";

const Observacion = (props) => {
  return (
    <div
      className="section"
      style={{ fontFamily: "Calibri", whiteSpace: "pre-wrap" }}>
      {props.info ? (
        <>
          <h2>{"Observaciones"}</h2>
          <TextareaAutosize
            className="observaciones"
            disabled={props.info}
            type="textarea"
            placeholder=""
            value={props.observation}
            onChange={(e) => {
              props.setObservation(e.currentTarget.value);
            }}
          />
        </>
      ) : (
        <>
          <h2>{"Observaciones (editable)"}</h2>
          <TextareaAutosize
            className="observaciones"
            type="textarea"
            placeholder=""
            value={props.observation}
            onChange={(e) =>
              props.dispatch({
                type: "observation",
                payLoad: e.currentTarget.value,
              })
            }
          />
        </>
      )}
    </div>
  );
};

export default React.memo(Observacion);
