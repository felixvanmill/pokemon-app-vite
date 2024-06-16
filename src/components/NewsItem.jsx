import React from 'react';
import '../styles/ComponentStyles/NewsItem.css';

function NewsItem({ image, title, description, date }) {
    return (
        <div className="news-item">
            <img src={image} alt={title} className="news-image" />
            <div className="news-content">
                <h2 className="news-title">{title}</h2>
                <p className="news-date">{date}</p>
                <p className="news-description">{description}</p>
            </div>
        </div>
    );
}

export default NewsItem;
