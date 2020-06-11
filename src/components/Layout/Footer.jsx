import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {

  return (
    <footer className="footer">
      <div className="container-fluid bg-primary py-2">
      </div>
      <div className="container-fluid bg-dark py-5">
        <div className="container text-center text-white">
          <div className="flex-center">

            <FontAwesomeIcon icon={['fab', 'facebook']} size="2x" className="mx-4" />
            <FontAwesomeIcon icon={['fab', 'twitter']} size="2x" className="mx-4" />
            <FontAwesomeIcon icon={['fab', 'google-plus']} size="2x" className="mx-4" />
            <FontAwesomeIcon icon={['fab', 'linkedin-in']} size="2x" className="mx-4" />
            <FontAwesomeIcon icon={['fab', 'instagram']} size="2x" className="mx-4" />
            <FontAwesomeIcon icon={['fab', 'ubuntu']} size="2x" className="mx-4" />

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;