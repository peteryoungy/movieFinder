import React from 'react';

function LikePage(props) {


    const response = {
        likes:
            [
                {
                    id: "1",
                    title: "film1",
                    image: "string",
                    actors: ["actor1", "actor2", "actor3"],
                    directors: ["director1", "director2", "director3"], 
                    rating: 4.5
                },
                {
                    id: "2",
                    title: "film2",
                    image: "string",
                    actors: ["actor1", "actor2", "actor3"],
                    directors: ["director1", "director2", "director3"], 
                    rating: 4.5
                },
                {
                    id: "3",
                    title: "film3",
                    image: "string",
                    actors: ["actor1", "actor2", "actor3"],
                    directors: ["director1", "director2", "director3"], 
                    rating: 4.5
                },
                
            ]
    }

    return (
        <div>
            LikePage
        </div>
    );
}

export default LikePage;