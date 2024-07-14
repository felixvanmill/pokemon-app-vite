//Homepage is used to display newsarticles, uses the component Newsitem.
import React from 'react';
import NewsItem from '../components/NewsItem.jsx';
import '../styles/PagesStyles/HomePage.css';

function HomePage() {
    const newsItems = [
        {
            image: 'https://www.yourdecoration.nl/cdn/shop/files/gbeye-fp4716-pokemon-pikachu-neon-poster-61x91-5cm_500x.jpg?v=1715338374',
            title: 'First release of the application',
            description: 'Thank you for visiting my website!',
            date: '9 June, 2024',
        },
        {
            image: 'https://duet-cdn.vox-cdn.com/thumbor/0x0:2257x1320/750x500/filters:focal(1129x660:1130x661):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/6839749/pokemon.0.png',
            title: 'Article',
            description: 'This is the description for Pokémon news 2.',
            date: '5 May, 2024',
        },
        // Add more news items here
    ];

    return (
        <div className="homepage">
            <h1>Welcome to the Pokémon App!</h1>
            <div className="news-list">
                {newsItems.map((news, index) => (
                    <NewsItem
                        key={index}
                        image={news.image}
                        title={news.title}
                        description={news.description}
                        date={news.date} // Pass the date prop
                    />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
