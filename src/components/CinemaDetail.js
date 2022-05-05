import React from 'react';
import {useParams} from 'react-router-dom';


function CinemaDetail(props) {

    const {cinema_id} = useParams()

    console.log('cinema_id', cinema_id)
    
    return (
        <div>
            CinemaDetail
        </div>
    );
}

export default CinemaDetail;