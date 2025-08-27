import React, { useEffect } from "react";
import "./Home.css";
import Me from "../../assets/Brij_Portfolio_image.png";
import HeaderSocials from "./HeaderSocials";
import ScrollDown from "./ScrollDown";
import Shapes from "./Shapes";

const Home = () => {
  // Google Analytics tracking functions
  const trackSectionView = (sectionName) => {
    if (window.gtag) {
      window.gtag('event', 'view_section', {
        event_category: 'Navigation',
        event_label: sectionName,
      });
    }
  };

  const trackButtonClick = (buttonName, location) => {
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'Button',
        event_label: `${buttonName} - ${location}`,
      });
    }
  };

  const trackImageView = (imageName) => {
    if (window.gtag) {
      window.gtag('event', 'view_image', {
        event_category: 'Media',
        event_label: imageName,
      });
    }
  };

  // Track when Home section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView('Home');
            trackImageView('Profile Image - Brij Kumbhani');
          }
        });
      },
      { threshold: 0.5 }
    );

    const homeSection = document.getElementById('home');
    if (homeSection) {
      observer.observe(homeSection);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle Contact Me button click
  const handleContactClick = (e) => {
    trackButtonClick('Contact Me', 'Home Hero');
  };

  // Handle profile image click (if you want to track it)
  const handleImageClick = () => {
    trackImageView('Profile Image Click');
  };

  return (
    <section className="home container" id="home">
      <div className="intro">
        <img 
          src={Me} 
          alt="Brij Kumbhani - Analytics Engineer" 
          className="home__img" 
          width="120"
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />
        <h1 className="home__name">Brij Kumbhani</h1>
        <span className="home__education">Analytics Engineer</span>

        <HeaderSocials />

        <a 
          href="#contact" 
          className="btn"
          onClick={handleContactClick}
        >
          {" "}
          Contact Me
        </a>

        <ScrollDown />
      </div>

      <Shapes />
    </section>
  );
};

export default Home;