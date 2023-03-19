import React from "react";
import classes from './Footer.module.css'

function Footer(): JSX.Element {
  return (
    <footer className={classes.Footer}>
        <p>© Bulle de Code. Tous droits réservés.</p>
    </footer>
  );
}

export default Footer;
