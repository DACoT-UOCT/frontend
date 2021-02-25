import React from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import { Button } from "reactstrap";

import styles from "./Profile.module.css";

function Profile({ user, email, rol, state, dispatch }) {
  return (
    <div className={styles.profile}>
      <div className={styles.info}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt=""
        />
        <span className={styles.username}>{user}</span>
        <span className={styles.email}>
          <MailOutlineIcon fontSize="small" className={styles.icon} />
          {email}
        </span>
        <span className={styles.rol}>
          <PersonOutlineIcon fontSize="small" className={styles.icon} />
          {rol}
        </span>
      </div>
      <div className={styles.admin}>
        <span className={styles.contact}>
          <SettingsIcon fontSize="small" className={styles.icon} />
          Contacto Administrador:
        </span>
        <span className={styles.admin_mail}>admin@uoct.cl</span>
      </div>
      {state.debug && (
        <Button onClick={() => dispatch({ type: "switch_profile" })}>
          <span>Switch profile</span>
        </Button>
      )}
      <span className={styles.footer}>@DACoT 2020</span>
    </div>
  );
}

export default Profile;
