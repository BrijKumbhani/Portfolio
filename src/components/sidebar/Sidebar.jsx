import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../assets/BK_logo.png";
import LightLogo from "../../assets/BK_logo.png";

import {
  RiHome2Line,
  RiUser3Line,
  RiBriefcase2Line,
  RiStackLine,
  RiDraftLine,
  RiChat3Line,
  RiFileList3Line,
  RiMoonLine,
  RiSunLine,
  RiMenu2Line,
} from "react-icons/ri";

const Sidebar = (props) => {
  const [toggle, showMenu] = useState(false);

  // Google Analytics tracking functions
  const trackNavigation = (section) => {
    if (window.gtag) {
      window.gtag('event', 'navigate', {
        event_category: 'Navigation',
        event_label: section,
      });
    }
  };

  const trackThemeToggle = (newTheme) => {
    if (window.gtag) {
      window.gtag('event', 'theme_toggle', {
        event_category: 'User Interaction',
        event_label: newTheme,
      });
    }
  };

  const trackMenuToggle = (isOpen) => {
    if (window.gtag) {
      window.gtag('event', 'menu_toggle', {
        event_category: 'Navigation',
        event_label: isOpen ? 'Open Menu' : 'Close Menu',
      });
    }
  };

  const handleNavClick = (section) => {
    trackNavigation(section);
  };

  const handleThemeToggle = () => {
    const newTheme = props.theme === "light" ? "dark" : "light";
    trackThemeToggle(newTheme);
    props.switchTheme();
    showMenu(!toggle);
  };

  const handleMenuToggle = () => {
    const newToggleState = !toggle;
    trackMenuToggle(newToggleState);
    showMenu(newToggleState);
  };

  return (
    <>
      <aside className={toggle ? "aside show-menu" : "aside"}>
        <a href="#home" className="nav__logo" onClick={() => handleNavClick('Home - Logo')}>
          <img src={props.theme === "light" ? LightLogo : Logo} alt="logo" />
        </a>

        <nav className="nav">
          <div className="nav__menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#home" className="nav__link" onClick={() => handleNavClick('Home')}>
                  <RiHome2Line />
                </a>
              </li>

              <li className="nav__item">
                <a href="#about" className="nav__link" onClick={() => handleNavClick('About')}>
                  <RiUser3Line />
                </a>
              </li>

              <li className="nav__item">
                <a href="#services" className="nav__link" onClick={() => handleNavClick('Services')}>
                  <RiFileList3Line />
                </a>
              </li>

              <li className="nav__item">
                <a href="#resume" className="nav__link" onClick={() => handleNavClick('Resume')}>
                  <RiBriefcase2Line />
                </a>
              </li>

              <li className="nav__item">
                <a href="#portfolio" className="nav__link" onClick={() => handleNavClick('Portfolio')}>
                  <RiStackLine />
                </a>
              </li>

              {/* <li className="nav__item">
                                <a href="#blog" className="nav__link">
                                    <RiDraftLine />
                                </a>
                            </li> */}

              <li className="nav__item">
                <a href="#contact" className="nav__link" onClick={() => handleNavClick('Contact')}>
                  <RiChat3Line />
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="nav__footer">
          <button
            onClick={handleThemeToggle}
            className="nav__link footer__button"
          >
            {props.theme === "light" ? <RiMoonLine /> : <RiSunLine />}
          </button>
        </div>
      </aside>

      <div
        className={toggle ? "nav__toggle nav__toggle-open" : "nav__toggle"}
        onClick={handleMenuToggle}
      >
        <RiMenu2Line />
      </div>
    </>
  );
};

export default Sidebar;