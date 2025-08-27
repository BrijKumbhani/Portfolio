import React, { useState, useEffect } from "react";
import "./Resume.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Button from "./Button";
import WorkExperience from "./WorkExperience";
import { trackSectionView, trackButtonClick, trackSkillView } from "../../utils/tracking";

const Resume = () => {
    const [tabIndex, setTabIndex] = useState(0);

    // Track when Resume section comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        trackSectionView('Resume');
                    }
                });
            },
            { threshold: 0.5 }
        );

        const section = document.getElementById('resume');
        if (section) {
            observer.observe(section);
        }

        return () => observer.disconnect();
    }, []);

    // Handle tab selection with tracking
    const handleTabChange = (index) => {
        setTabIndex(index);
        const selectedCompany = WorkExperience[index]?.company;
        if (selectedCompany) {
            trackButtonClick(`Experience Tab - ${selectedCompany}`, 'Resume Section');
            trackSkillView(`Work Experience - ${selectedCompany}`);
        }
    };

    return (
        <section className="resume container section" id="resume">
            <h2 className="section__title">Experience</h2>

            <div className="resume__container">
                <Tabs
                    className="tabs"
                    selectedIndex={tabIndex}
                    onSelect={handleTabChange}
                    selectedTabClassName={"is-active"}
                    selectedTabPanelClassName={"is-active"}
                >
                    <TabList className="tab__list">
                        {WorkExperience.map((experience, index) => {
                            const { id, company } = experience;
                            return (
                                <Tab className="tab" key={`company-${id}`}>
                                    <Button>{company}</Button>
                                </Tab>
                            );
                        })}
                    </TabList>

                    {WorkExperience.map((experience) => {
                        const { id, company, yearsActive, title, information } = experience;
                        return (
                            <TabPanel className="tab__panel" key={`panel-${id}`}>
                                <h2 className="tab__panel-title">
                                    {title} @ {company}
                                </h2>
                                <p className="tab__panel-subtitle">{yearsActive}</p>
                                <ul className="tab__panel-list">
                                    {information.map((info, index) => {
                                        return <li key={`info-${index}`}>{info}</li>;
                                    })}
                                </ul>
                            </TabPanel>
                        );
                    })}
                </Tabs>
            </div>
        </section>
    );
};

export default Resume;