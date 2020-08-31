import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";

import './header.css'

function Header() {
    return (

        <Carousel>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="images/cinema.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>MOVIE CHOOSER</h3>
                    <p>On this website you can find different movies divided on genres, also a short descripton and other information.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="images/movie.jpg"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <Link to='/like' className="link-header">
                        <h3>Add to Fav</h3>
                        <p>Clicking on heart on movie poster you can store movie for later.</p>
                    </Link>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="images/jocker.jpg"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <Link to='/joker' className="link-header">
                        <h3>Check Joker</h3>
                        <p>No idea for movie tonight, click on Joker to see our choice for today or maybe it's book night today.</p>
                    </Link>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>

    )
}
export default Header