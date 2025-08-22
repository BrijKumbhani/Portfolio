import React from "react";
import { FaGithub, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope } from "react-icons/fa";

const HeaderSocials = () => {
  return (
    <div className="home__socials">
      <a
        href="https://github.com/BrijKumbhani"
        className="home__social-link"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub />
      </a>

      <a
        href="https://www.linkedin.com/in/brij-kumbhani/"
        className="home__social-link"
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedinIn />
      </a>
      

      <a
        href="https://www.instagram.com/biju__162?igsh=MTM4a2E3MTN1enlrMQ=="
        className="home__social-link"
        target="_blank"
        rel="noreferrer"
      >
        <FaInstagram />{" "}
      </a>

      <a
        href="tel:+91-9173830347"
        className="home__social-link"
        target="_blank"
        rel="noreferrer"
      >
        <FaPhone />
      </a>

      <a href="mailto:brijkumbhani162@gmail.com" className="home__social-link">
        <FaEnvelope />
      </a>

      {/* <a
        href="https://www.twitter.com/GregSithole"
        className="home__social-link"
        target="__blank"
        rel="noreferrer"
      >
        <FaTwitter />
      </a> */}
    </div>
  );
};

export default HeaderSocials;
