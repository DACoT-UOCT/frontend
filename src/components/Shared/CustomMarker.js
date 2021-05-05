import React from "react";
import "../../App.css";
import { Popover, makeStyles, Typography } from "@material-ui/core";

const CustomMarker = (props) => {
  const useStyles = makeStyles((theme) => ({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
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
    <div className="semaforo-marker">
      <img
        style={{ filter: props.gray ? "grayscale(80%)" : "grayscale(0%)" }}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseOver={handlePopoverOpen}
        onMouseOut={handlePopoverClose}
        // onMouseEnter={handlePopoverOpen}
        // onMouseLeave={handlePopoverClose}
        src="/imagenes/semaforo.png"
        width="40vw"
        height="40vh"
        onClick={() => props.buscar(props.label)}></img>
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
        <Typography>{props.label}</Typography>
      </Popover>
    </div>
  );
};

export default CustomMarker;
