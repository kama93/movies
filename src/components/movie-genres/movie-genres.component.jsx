import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Card from '../card/card.component';

import MOVIE_DATA from './movie.genres.array.js';

import './movie-genres.styles.scss';



const MovieGenres = () => {
    const history = useHistory();
    const [genres, setGenres] = useState(MOVIE_DATA);

    return (
        <div className="main-genres">
            {genres.map(({ id, ...otherGenresProps }) => (
                <Card key={id} {...otherGenresProps} onClick={() => history.push('/genre/' + id)} />))}
        </div>)
}


export default MovieGenres