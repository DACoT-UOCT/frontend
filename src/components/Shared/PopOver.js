import React from "react";
import "../../App.css";
import { Popover, makeStyles, Typography } from "@material-ui/core";

/*Componente que permite mostrar un mensaje al pasar el mouse
sobre un icono de informacion */
const PopOver = (props) => {
  const useStyles = makeStyles((theme) => ({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: "1.5rem",
    },
  }));

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <img
        alt=""
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        src="/information.svg"
        style={{ marginLeft: "1rem", marginRight: "2rem" }}></img>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus>
        <Typography style={{ marginBottom: ".5rem" }}>
          {props.mensaje}
        </Typography>
        {props.children}
      </Popover>
    </>
  );
};

export default PopOver;
