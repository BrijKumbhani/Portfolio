import React, { useEffect } from "react";
import "./About.css";
import Image from "../../assets/Brij_logo.png";
import Resume from "../../assets/resume.pdf";
import AboutBox from "./AboutBox";

const About = () => {
  // Google Analytics tracking functions
  const trackSectionView = (sectionName) => {
    if (window.gtag) {
      window.gtag('event', 'view_section', {
        event_category: 'Navigation',
        event_label: sectionName,
      });
    }
  };

  const trackResumeDownload = (format) => {
    if (window.gtag) {
      window.gtag('event', 'download_resume', {
        event_category: 'Lead Generation',
        event_label: format,
        value: 1
      });
    }
  };

  const trackSkillsView = (skillCategory) => {
    if (window.gtag) {
      window.gtag('event', 'view_skills', {
        event_category: 'Skills',
        event_label: skillCategory,
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

  const trackReadingTime = (startTime) => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    if (timeSpent > 5 && window.gtag) { // Only track if more than 5 seconds
      window.gtag('event', 'time_spent', {
        event_category: 'Engagement',
        event_label: 'About Section',
        value: timeSpent
      });
    }
  };

  // Track when About section comes into view
  useEffect(() => {
    let startTime = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTime = Date.now();
            trackSectionView('About');
            trackImageView('About Image - Brij Logo');
            trackSkillsView('Technical Skills Overview');
          } else if (startTime) {
            trackReadingTime(startTime);
            startTime = null;
          }
        });
      },
      { threshold: 0.5 }
    );

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (startTime) {
        trackReadingTime(startTime);
      }
      observer.disconnect();
    };
  }, []);

  // Track individual skill views when they come into view
  useEffect(() => {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillName = entry.target.querySelector('.skills__name')?.textContent;
            if (skillName) {
              trackSkillsView(skillName);
            }
          }
        });
      },
      { threshold: 0.7 }
    );

    const skillElements = document.querySelectorAll('.skills__data');
    skillElements.forEach(skill => skillObserver.observe(skill));

    return () => {
      skillObserver.disconnect();
    };
  }, []);

  const downloadResume = async () => {
    trackResumeDownload('PDF');
    window.open(Resume, "_blank");
  };

  const handleImageClick = () => {
    trackImageView('About Image Click');
  };

  const handleSkillClick = (skillName) => {
    if (window.gtag) {
      window.gtag('event', 'skill_interest', {
        event_category: 'Skills',
        event_label: skillName,
      });
    }
  };

  return (
    <section className="about container section" id="about">
      <h2 className="section__title">About Me </h2>

      <div className="about__container grid">
        <img 
          src={Image} 
          alt="Brij Kumbhani Logo" 
          className="about__img"
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />

        <div className="about__data grid">
          <div className="about__info">
            <p className="about__description">
              🔍 Curious about the stories data can tell? I'm Brij Kumbhani, a Computer Engineering student with a passion for turning raw numbers into real insights.
              <br />
              Skilled in SQL, Python, Power BI, and Excel, I've worked on projects ranging from retail dashboards to election data analysis. With certifications in data tools and a solid academic record, I combine technical expertise with discipline and leadership, shaped by my NCC background.
              <br />
              Now seeking internship or entry-level roles in data analytics or business intelligence—ready to learn, contribute, and grow.
              <br />
              Let's connect!
              <br />
              <br />
              Here are a few technologies I've been working with recently:
            </p>
            <ul className="about__list">
              <li onClick={() => handleSkillClick('Python Programming')}>Python(Programming Language)</li>
              <li onClick={() => handleSkillClick('SQL')}>SQL</li>
              <li onClick={() => handleSkillClick('PostgreSQL')}>PostgreSQL</li>
              <li onClick={() => handleSkillClick('Machine Learning')}>Machine Learning</li>
              <li onClick={() => handleSkillClick('Data Analytics')}>Data Analytics</li>
              <li onClick={() => handleSkillClick('Data Visualization')}>Data Visualization</li>
              <li onClick={() => handleSkillClick('Data Cleaning')}>Data Cleaning</li>
              <li onClick={() => handleSkillClick('Power BI')}>Power BI</li>
              <li onClick={() => handleSkillClick('Tableau')}>Tableau</li>
              <li onClick={() => handleSkillClick('MS Excel')}>MS Excel</li>
              <li onClick={() => handleSkillClick('Problem Solving')}>Problem Solving</li>
              <li onClick={() => handleSkillClick('MongoDB')}>MongoDB</li>
              <li onClick={() => handleSkillClick('Statistics')}>Statistics</li>
              <li onClick={() => handleSkillClick('Effective Communication')}>Effective Communication</li>
            </ul>
            <button className="btn" onClick={downloadResume}>
              Download CV
            </button>
          </div>

          <div className="about__skills grid">
            <div className="skills__data">
              <div className="skills__titles">
                <h3 className="skills__name">Data Analysis & Visualization</h3>
                <span className="skills__number">90%</span>
              </div>

              <div className="skills__bar">
                <span className="skills__percentage development"></span>
              </div>
            </div>

            <div className="skills__data">
              <div className="skills__titles">
                <h3 className="skills__name">SQL(PostgreSQL)</h3>
                <span className="skills__number">80%</span>
              </div>

              <div className="skills__bar">
                <span className="skills__percentage ui__design"></span>
              </div>
            </div>

            <div className="skills__data">
              <div className="skills__titles">
                <h3 className="skills__name">Python</h3>
                <span className="skills__number">60%</span>
              </div>

              <div className="skills__bar">
                <span className="skills__percentage photography"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AboutBox />
    </section>
  );
};

export default About;