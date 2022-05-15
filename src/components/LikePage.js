import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Space, Empty, message, Spin } from "antd";
import { Typography } from "antd";
import axios from "axios";
import { ENDPOINT } from "../constants";

const { Title } = Typography;

const defaultResponse = {
    likes: [
        {
            id: "296301",
            title: "Doctor Strange in the Multiverse of Madness",
            image: "https://image.movieglu.com/296301/296301h1.jpg",
            actors: ["Benedict Cumberbatch", "Elizabeth Olsen"],
            directors: ["Sam Raimi"],
            rating: "2",
        },
        {
            id: "300783",
            title: "The Bad Guys",
            image: "https://image.movieglu.com/300783/300783h1.jpg",
            actors: [
                "Sam Rockwell",
                "Awkwafina",
                "Anthony Ramos",
                "Marc Maron",
                "Craig Robinson",
            ],
            directors: ["Pierre Perifel"],
            rating: "2.5",
        },
    ],
};

const defaultNull = {
    likes: null,
};

function LikePage(props) {
    const { auth } = props;

    console.log("props", props);

    // todo: make initial state null
    const [response, setResponse] = useState(defaultResponse);

    // const [response, setResponse] = useState(defaultNull);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // todo: uncomment this when HistoryLambda is ready
        // apiGetLikes();
    }, []);

    const apiGetLikes = () => {
        setIsLoading(true);

        let url = `${ENDPOINT}/history`;
        const API_KEY = process.env["REACT_APP_AWS_API_KEY"];
        // console.log('API KEY', API_KEY)

        const opt = {
            method: "GET",
            url: url,
            headers: {
                "x-api-key": API_KEY,
                "x-amz-meta-user": auth.user.attributes.sub,
            },
        };

        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    console.log("History request sent.");
                    console.log("res.data", res.data);

                    setResponse(res.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                message.error("Fetch favorite failed!");
                console.log("Fetch Favorite failed: ", err.message);

                setResponse(defaultNull);
                setIsLoading(false);
            });
    };

    const renderLikes = () => {
        if (response.likes === null) {
            return <Empty />;
        }

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
            {isLoading === true ? (
                <div>
                    <Row justify="center">
                        <Col>
                            <Spin size="large" />
                        </Col>
                    </Row>
                </div>
            ) : (
                <div>
                    <div className="sub-title"> Your Likes </div>
                    <div className="like-list">{renderLikes()}</div>
                </div>
            )}
        </div>
    );
}

export default LikePage;
