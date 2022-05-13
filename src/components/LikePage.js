import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Space, Empty, message } from "antd";
import { Typography } from "antd";
import axios from "axios";
import { ENDPOINT } from "../constants";

const { Title } = Typography;

function LikePage(props) {
    // att: why useRef?
    // const title = useRef(null)

    const {auth} = props;

    console.log('props', props)

    // todo: make initial state null
    const [response, setResponse] = useState({
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
    });

    useEffect(() => {

        // todo: uncomment this when HistoryLambda is ready
        // apiGetLikes()
    }, []);


    const apiGetLikes = () => {

        let url = `${ENDPOINT}/history`;

        const API_KEY = process.env["REACT_APP_AWS_API_KEY"]
        // console.log('API KEY', API_KEY)

        const opt = {
            method: "GET",
            url: url,
            headers: {
                "x-api-key": API_KEY,
                "x-amz-meta-user": auth.user.attributes.sub
            },
        };

        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    console.log("History request sent.");

                    console.log(res.data);

                    // todo: uncomment this when HistoryLambda is ready
                    setResponse(res.data)
                }
            })
            .catch((err) => {
                message.error("Fetch favorite failed!");
                console.log("Fetch Favorite failed: ", err.message);
            });
    }


    const renderLikes = () => {

        // todo: uncomment this
        // if (response === null) {
        //     return <Empty/>;
        // }

        return response.likes.map((d) => (
            <div className="like-card" key={d["id"]}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col>
                        <img src={d["image"]} className="like-img" />
                    </Col>

                    <Col span={16}>
                        <div className="like-content">
                            <div
                                className="pointer like-content-title movie-name"
                                data-id={d["id"]}
                                onClick={onClickMovieName}
                            >
                                {d["title"]}
                            </div>

                            <div className="like-content-default">
                                Directors: {d["directors"].join(" ")}
                            </div>

                            <div className="like-content-default">
                                Actors: {d["actors"].join(" ")}
                            </div>
                        </div>
                    </Col>

                    {/* <Col>love</Col> */}
                </Row>
            </div>
        ));
    };


    const onClickMovieName = (e) => {
        console.log("event", e);

        let movie_id = e.target.getAttribute("data-id");
        console.log("movie_id", movie_id);
        window.location.href = "/movie/" + movie_id;
    };


    return (
        <div className="bg-2">
            <br />
            <div className="sub-title"> Your Likes </div>
            <div className="like-list">{renderLikes()}</div>
        </div>
    );
}

export default LikePage;
