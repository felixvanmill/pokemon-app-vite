// Component to create newsitems on the homepage. Takes in a title, IMG, newsdate and description
import React from 'react';
import '../styles/ComponentStyles/NewsItem.css';

function NewsItem({ image, title, description, date }) {
    return (
        <div className="news-item">
            <img src={image} alt={title} className="news-image" /> {/* Display news image */}
            <div className="news-content">
                <h2 className="news-title">{title}</h2> {/* Display news title */}
                <p className="news-date">{date}</p> {/* Display news date */}
                <p className="news-description">{description}</p> {/* Display news description */}
            </div>
        </div>
    );
}

export default NewsItem;
