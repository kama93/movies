import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/actions';

import './like.styles.scss'
import Ellipsis from '../ellipsis/ellipsis.component';


const Like = ({ currentUser }) => {
    let [movies, setMovies] = useState();

    useEffect(() => {
        fetch('http://localhost:3005/like/' + currentUser.id, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            // .then (response=> console.log(response))
            .then(response => Promise.all(response.map(x =>
                fetch('http://localhost:3005/joker', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: x.movie_id
                    })
                }))))
            .then(response => Promise.all(response.map(x => x.json())))
            .then(response => {
                setMovies(response);
                console.log(response);
            })
    }, [])

    return (
        <div className='cart-page-like'>
            {movies && movies.map(movie => (

                <div className='cart-like'>
                    <Ellipsis text={movie.title} fontSize={20} />
                    <img className='poster-like' style={{ 'width': '100%' }} alt='poster' src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />

                </div>))}
        </div>)
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});
export default connect(mapStateToProps)(Like)