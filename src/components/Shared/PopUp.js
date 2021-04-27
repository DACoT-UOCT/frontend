import React, { useEffect } from "react";
import "../../App.css";
import styles from "./PopUp.module.css";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  makeStyles,
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PopUp = (props) => {
  return (
    <>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth={props.map != null ? "lg" : "md"}>
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{ paddingBottom: "0" }}>
          <div className={styles.row}>
            {props.title}{" "}
            <button onClick={() => props.setOpen(false)}>X</button>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ padding: "1rem" }}>
            {props.children}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PopUp;
