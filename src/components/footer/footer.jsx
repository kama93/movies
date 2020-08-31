import React from 'react';

import './footer.styles.scss'

const Footer = () => {
    return (
        <div className='foot'>
            <div className='left-side'>
                <a href='https://unsplash.com/' style={{ fontSize: '15px', color: 'white' }}>photos from: unsplash.com</a>
                <p style={{ fontSize: '10px' }}>This product uses the TMDb API but is not endorsed or certified by TMDb</p>
            </div>
            <img src='/images/tmdb.png' alt="TMDb logo" className='tmdb' />
        </div>)
}

export default Footer