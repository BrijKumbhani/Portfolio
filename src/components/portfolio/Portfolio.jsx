import React, { useState, useEffect } from "react";
import "./Portfolio.css";

import Menu from "./Menu";
import { RiGithubLine, RiLink } from "react-icons/ri";

import { motion } from "framer-motion";
import { 
	trackSectionView, 
	trackButtonClick, 
	trackProjectView, 
	trackProjectDemo, 
	trackExternalLink 
} from "../../utils/tracking";

const Portfolio = () => {
	const [items, setItems] = useState(Menu);
	const [activeFilter, setActiveFilter] = useState(0);

	// Track when Portfolio section comes into view
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						trackSectionView('Portfolio');
					}
				});
			},
			{ threshold: 0.5 }
		);

		const section = document.getElementById('portfolio');
		if (section) {
			observer.observe(section);
		}

		return () => observer.disconnect();
	}, []);

	// Track portfolio filter clicks and project filtering
	const handleFilterClick = (categoryItem, filterIndex, filterName) => {
		// Track the filter button click
		trackButtonClick(`Portfolio Filter - ${filterName}`, 'Portfolio Section');
		
		// Update the items and active filter
		if (categoryItem === 'All') {
			setItems(Menu);
		} else {
			const updatedItems = Menu.filter((curElem) => {
				return curElem.category.includes(categoryItem);
			});
			setItems(updatedItems);
		}
		setActiveFilter(filterIndex);
	};

	// Track project interactions
	const handleProjectView = (projectTitle) => {
		trackProjectView(projectTitle);
	};

	// Track project demo/live site clicks
	const handleDemoClick = (projectTitle, url) => {
		trackProjectDemo(projectTitle, 'Live Demo');
		trackExternalLink(url, `${projectTitle} - Live Demo`);
	};

	// Track GitHub repository clicks
	const handleGithubClick = (projectTitle, repositoryUrl) => {
		trackProjectDemo(projectTitle, 'GitHub Repository');
		trackExternalLink(repositoryUrl, `${projectTitle} - GitHub`);
	};

	return (
		<section className="portfolio container section" id="portfolio">
			<h2 className="section__title">Recent Projects</h2>

			<div className="portfolio__filters">
				<span 
					className={activeFilter === 0 ? 'portfolio__item portfolio__item-active' : 'portfolio__item'} 
					onClick={() => handleFilterClick('All', 0, 'All Projects')}
				>
					All
				</span>
				<span 
					className={activeFilter === 1 ? 'portfolio__item portfolio__item-active' : 'portfolio__item'} 
					onClick={() => handleFilterClick('Developing', 1, 'Developing')}
				>
					Developing
				</span>
				<span 
					className={activeFilter === 2 ? 'portfolio__item portfolio__item-active' : 'portfolio__item'} 
					onClick={() => handleFilterClick('Data Analysis or EDA', 2, 'Data Analysis or EDA')}
				>
					Data Analysis or EDA
				</span>
				<span 
					className={activeFilter === 3 ? 'portfolio__item portfolio__item-active' : 'portfolio__item'} 
					onClick={() => handleFilterClick('Data Visulization(Power bi)', 3, 'Data Visualization(Power BI)')}
				>
					Data Visulization(Power bi)
				</span>
			</div>

			<div className="portfolio__container grid">
				{items.map((elem) => {
					const { id, image, title, category, url, repositoryUrl } = elem;

					return (
						<motion.div
							layout
							animate={{ opacity: 1 }}
							initial={{ opacity: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="portfolio__card"
							key={id}
							onClick={() => handleProjectView(title)}
						>
							<div className="portfolio__thumbnail">
								<img src={image} alt={`${title} project screenshot`} className="portfolio__img" height="267" />
								<div className="portfolio__mask"></div>
							</div>

							<span className="portfolio__category">{category.join(', ')}</span>
							<h3 className="portfolio__title">{title}</h3>
							<a 
								href={url} 
								target="_blank" 
								rel="noreferrer" 
								className="portfolio__button"
								onClick={(e) => {
									e.stopPropagation();
									handleDemoClick(title, url);
								}}
							>
								<RiLink className="portfolio__button-icon" />
							</a>
							<a 
								href={repositoryUrl} 
								target="_blank" 
								rel="noreferrer" 
								className="portfolio__github-button"
								onClick={(e) => {
									e.stopPropagation();
									handleGithubClick(title, repositoryUrl);
								}}
							>
								<RiGithubLine className="portfolio__button-icon" />
							</a>
						</motion.div>
					);
				})}
			</div>
		</section>
	);
};

export default Portfolio;