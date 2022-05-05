import React from 'react';

import {useParams} from 'react-router-dom';


function MovieDetail(props) {

    const {movie_id} = useParams()

    console.log('movie_id', movie_id)
    return (
        <div>
            MovieDetail
        </div>
    );
}

export default MovieDetail;