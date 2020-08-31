import React from 'react';

import Header from '../../components/header/header';
import MovieGenres from '../../components/movie-genres/movie-genres.component';
import Footer from '../../components/footer/footer'

const Homepage = () => {
    return (
        <div>
            <Header />
            <MovieGenres />
            <Footer />
        </div>
    )
}

export default Homepage;