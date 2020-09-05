import React from 'react';

import './card.styles.scss'


const Card = ({ id, genre, image, onClick }) => {
    return (
        <div className='card' onClick={onClick}>
            <div
                className='image'
                style={{ backgroundImage: `url(${image})` }}
            />
            <div className='footer'>
                {genre.toUpperCase()}
            </div>

        </div>)
}

export default Card