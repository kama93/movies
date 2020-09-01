import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core"

import './joker.styles.scss'

const Joker = () => {

    let [movie, setMovie] = useState();
    let [randomNum, setRandomNum] = useState();
    let [imageUrl, setImageUrl] = useState();
    let [loader, setLoader] = useState(false)


    const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

    const moviePick = () => {
        setLoader(true)
        let x = Math.floor(Math.random() * 70000) + 1;
        setRandomNum(x);
        fetch('/api/joker', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: randomNum
            })
        })
            .then(response => response.json())
            .then(response => {
                setMovie(response);
                console.log(response);
                setImageUrl('https://image.tmdb.org/t/p/w500' + response.poster_path)
                setLoader(false)
            })
    }

    return (
        <div className='fortune'>
            {movie && (movie.poster_path ?
                (<div className="button-pos"><img className='posters' style={{ 'width': '100%' }} alt='poster' src={imageUrl} /><button className='start' onClick={() => moviePick()}>Recheck</button></div>) :
                (<div className="button-pos"><h1 className='books'>Go and read some books (just kidding ... please try again)</h1><button className='start' onClick={() => moviePick()}>Recheck</button></div>))}
            <ClipLoader
                css={override}
                size={150}
                color={"#123abc"}
                loading={loader}
            />
            {!movie && (<div className="button-pos"><p>Click 'start' and check what we have for yout today.</p><button className='start' onClick={() => moviePick()}>Start</button></div>)}


        </div>)
}

export default Joker