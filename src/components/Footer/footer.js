import React from "react";
import s from "./Footer.module.scss";
import footerLogo from "../../images/nitt.png";
const Footer = () => {
  return (
    <React.Fragment>
      <div>
        <footer className={s.contentFooter}>
          Powered by{" "}
          <strong>National Information Technology Developmnet Agency</strong>{" "}
          <img src={footerLogo} alt="footer logo" className={s.logo} />
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Footer;
