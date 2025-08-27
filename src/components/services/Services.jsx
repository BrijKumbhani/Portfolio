import React, { useEffect } from 'react';
import './Services.css';
import Image1 from '../../assets/Data_analysis.png'
import Image2 from '../../assets/Data-Visualization.png'
import Image3 from '../../assets/Business-Analytics.png'
import { trackSectionView, trackServiceInquiry } from '../../utils/tracking';

const data = [
    {
        id: 1,
        image: Image1,
        title: "Data Analysis",
        description:
            "Extracting, cleaning, and analyzing data to uncover insights that support data-driven decision-making.",
    },
    {
        id: 2,
        image: Image2,
        title: "Data Visualization",
        description:
            "Creating clear, interactive dashboards and visual reports using tools like Power BI and Excel to communicate insights effectively.",
    },
    {
        id: 3,
        image: Image3,
        title: "Business Analytics",
        description:
            "Transforming raw data into strategic recommendations by identifying trends, patterns, and key performance indicators.",
    },
];

const Services = () => {
    // Track when Services section comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        trackSectionView('Services');
                    }
                });
            },
            { threshold: 0.5 }
        );

        const section = document.getElementById('services');
        if (section) {
            observer.observe(section);
        }

        return () => observer.disconnect();
    }, []);

    // Handle service card click/interaction
    const handleServiceClick = (serviceName) => {
        trackServiceInquiry(serviceName);
    };

    return (
        <section className="services container section" id="services">
            <h2 className="section__title">Services</h2>

            <div className="services__container grid">
                {data.map(({ id, image, title, description }) => {
                    return (
                        <div 
                            className="services__card" 
                            key={id}
                            onClick={() => handleServiceClick(title)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={image} alt={`${title} service`} className='services__img' width="80" />

                            <h3 className="services__title">{title}</h3>
                            <p className="services__description">{description}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Services