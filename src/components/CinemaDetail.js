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

// "showtime" : {
//     "today": 
//         [
//             {
//                 "inemaId": "1",
//                 "cinemaName": "name1",
//                 "distance": "str",
//                 "times": [{
//                     "start_time":"16:34",
//                     "end_time": "20:45" 
//                 }]
//             },
//             {
//                 "inemaId": "2",
//                 "cinemaName": "name2",
//                 "distance": "str",
//                 "times": [{
//                     "start_time":"16:34",
//                     "end_time": "20:45" 
//                 }]
//             },
//             {
//                 "inemaId": "3",
//                 "cinemaName": "name3",
//                 "distance": "str",
//                 "times": [{
//                     "start_time":"16:34",
//                     "end_time": "20:45" 
//                 }]
//             },
//         ],
//     "tomorrow": 
//     "acquire": 
// }