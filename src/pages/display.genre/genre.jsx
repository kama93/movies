import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/actions';
import Ellipsis from '../../components/ellipsis/ellipsis.component'

import InfiniteScroll from 'react-infinite-scroll-component';

import './genre.styles.scss'

const Genre = ({ currentUser }) => {
    let { id } = useParams();
    let [movies, setMovies] = useState({ results: [] });
    let [page, setPage] = useState(1)

    useEffect(() => {
        fetch('http://localhost:3005/genre', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                page: page
            })
        })
            .then(response => response.json())
            .then(response => setMovies(response))
    }, [id])

    const fetchData = () => {
        setPage(page + 1)
        fetch('http://localhost:3005/genre', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                page: page + 1
            })
        })
            .then(response => response.json())
            .then(response => {
                setMovies({ results: [...movies.results, ...response.results] })
            })

    }

    const onButtonClick = (movie_id) => {
        fetch('http://localhost:3005/like', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: currentUser.id,
                movie_id: movie_id
            })
        })
            .then(response => response.json())
            .then(response => console.log(response))
    }

    return (
        <InfiniteScroll
            dataLength={movies.results.length}
            next={fetchData}
            hasMore={movies.results.length < 10000}
            loader={<div className="loader" key={0}><h1>Loading...</h1>
                <img src="/images/movie.svg" alt="loader" /></div>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }>

            <div className='cart-page'>
                {movies.results.map(movie => (

                    <div className='cart'>
                        <Ellipsis text={movie.title} />
                        <div>
                            <div className='container'>
                                <img className='poster' style={{ 'width': '100%' }} alt='poster' src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
                                <div className="middle">
                                    <div className='text'>
                                        <div className='datails'>
                                            Popularity: {movie.popularity}<br />
                                            Original title: {movie.original_title}<br />
                                            Original language: {movie.original_language}<br />
                                            Date release: {movie.release_date}<br />
                                        </div>
                                        <div className='like'>
                                            <button title="Add to favourites" onClick={() => onButtonClick(movie.id)} className='heart'>&#10084;</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className='description'>{movie.overview}</p>
                    </div>))}

            </div>
        </InfiniteScroll>
    )
}
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Genre)