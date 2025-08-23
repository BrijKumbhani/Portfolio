import React from "react";
import "./About.css";
import Image from "../../assets/Brij_logo.png";
import Resume from "../../assets/resume.pdf";
import AboutBox from "./AboutBox";

const About = () => {
  const downloadResume = async () => {
    window.open(Resume, "_blank");
  };

  return (
    <section className="about container section" id="about">
      <h2 className="section__title">About Me </h2>

      <div className="about__container grid">
        <img src={Image} alt="" className="about__img" />

        <div className="about__data grid">
          <div className="about__info">
            <p className="about__description">
              🔍 Curious about the stories data can tell? I’m Brij Kumbhani, a Computer Engineering student with a passion for turning raw numbers into real insights.
              <br />
              Skilled in SQL, Python, Power BI, and Excel, I’ve worked on projects ranging from retail dashboards to election data analysis. With certifications in data tools and a solid academic record, I combine technical expertise with discipline and leadership, shaped by my NCC background.
              <br />
              Now seeking internship or entry-level roles in data analytics or business intelligence—ready to learn, contribute, and grow.
              <br />
              Let’s connect!
              <br />
              <br />
              Here are a few technologies I’ve been working with recently:
            </p>
            <ul className="about__list">
              <li>Python(Programing Language)</li>
              <li>SQL</li>
              <li>Postgre SQl</li>
              <li>Machine Learning</li>
              <li>Data Analytics</li>
              <li>Data Visualization</li>
              <li>Data Cleaning</li>
              <li>Power BI</li>
              <li>Tableau</li>
              <li>MS Excel</li>
              <li>Problem Solving</li>
              <li>Mongo DB</li>
              <li>Statistics</li>
              <li>Effective Communication</li>
            </ul>
            <button className="btn" onClick={downloadResume}>
              Donwload CV
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
