import React, { useEffect, useRef } from "react";
import { Row, Col, Space } from "antd";

function LikePage(props) {
    // att: why useRef?
    // const title = useRef(null)

    const response = {
        likes: [
            {
                id: "1",
                title: "film1",
                image: "https://picsum.photos/200/300",
                actors: ["actor1", "actor2", "actor3"],
                directors: ["director1", "director2", "director3"],
                rating: 4.5,
            },
            {
                id: "2",
                title: "film2",
                image: "https://picsum.photos/200/300",
                actors: ["actor1", "actor2", "actor3"],
                directors: ["director1", "director2", "director3"],
                rating: 4.5,
            },
            {
                id: "3",
                title: "film3",
                image: "https://picsum.photos/200/300",
                actors: ["actor1", "actor2", "actor3"],
                directors: ["director1", "director2", "director3"],
                rating: 4.5,
            },
        ],
    };

    const likes = response.likes;
    const renderLikes = likes.map((d) => (
        <div className="like-card" key={d["id"]}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col>
                    <img src={d["image"]} className="like-img" />
                </Col>

                <Col span={16}>
                    <div className="like-content">
                        <div className="like-content-title" data-id={d["id"]}>
                            {d["title"]}
                        </div>

                        <div className="like-content-default">
                            Directors: {d["directors"]}
                        </div>

                        <div className="like-content-default">
                            Actors: {d["actors"]}
                        </div>
                    </div>
                </Col>

                {/* <Col>love</Col> */}
            </Row>
        </div>
    ));

    useEffect(() => {
        const titles = document.getElementsByClassName("like-content-title");
        console.log(titles);

        for (let i = 0; i < titles.length; i++) {
            // console.log('item', titles[i])
            let item = titles[i]

            item.classList.add("pointer");
            item.addEventListener("click", () => {
                console.log("navigate to", item.getAttribute("data-id"));
                // todo: build url
                // window.location.href = '/movie/' + item.getAttribute('data-id')
            });
        }

        return () => {
            const titles = document.getElementsByClassName("like-content-title");

            
            for (let i = 0; i < titles.length; i++) {
                let item = titles[i]
                
                item.classList.remove("pointer");
                item.removeEventListener("click");
            }
        };
    }, []);

    return (
        <div className="bg-2">
            <div className="like-list">{renderLikes}</div>
        </div>
    );
}

export default LikePage;
