import { Card } from "antd";
import {
    Row,
    Col,
    Image,
    Rate,
    Tag,
    Empty,
    notification,
    message,
    Spin,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ENDPOINT } from "../constants";
import { StarTwoTone } from "@ant-design/icons";
import { auth0SignInButton, selectInput } from "aws-amplify";

const defaultResponse = {
    recommendation: [
        {
            id: "327020",
            title: "Everything Everywhere All At Once",
            image: "https://image.movieglu.com/327020/327020h1.jpg",
            rating: "3",
            duration: "140",
        },
        {
            id: "318723",
            title: "The Northman",
            image: "https://image.movieglu.com/318723/318723h1.jpg",
            rating: "3.5",
            duration: "136",
        },
        {
            id: "296301",
            title: "Doctor Strange in the Multiverse of Madness",
            image: "https://image.movieglu.com/296301/296301h1.jpg",
            rating: "2",
            duration: "126",
        },
    ],
    nowshowing: [
        {
            id: 296301,
            title: "Doctor Strange in the Multiverse of Madness",
            image: "https://image.movieglu.com/296301/296301h1.jpg",
            duration: "126",
            rating: "2",
        },
        {
            id: 327907,
            title: "Firestarter",
            image: "https://image.movieglu.com/327907/327907h1.jpg",
            duration: "94",
            rating: "0",
        },
        {
            id: 300783,
            title: "The Bad Guys",
            image: "https://image.movieglu.com/300783/300783h1.jpg",
            duration: "100",
            rating: "2.5",
        },
        {
            id: 310966,
            title: "Sonic the Hedgehog 2",
            image: "https://image.movieglu.com/310966/310966h1.jpg",
            duration: "122",
            rating: "0",
        },
        {
            id: 197407,
            title: "Fantastic Beasts: The Secrets of Dumbledore",
            image: "https://image.movieglu.com/197407/197407h1.jpg",
            duration: "142",
            rating: "2",
        },
        {
            id: 327020,
            title: "Everything Everywhere All At Once",
            image: "https://image.movieglu.com/327020/327020h1.jpg",
            duration: "140",
            rating: "3",
        },
        {
            id: 316485,
            title: "The Lost City",
            image: "https://image.movieglu.com/316485/316485h1.jpg",
            duration: "112",
            rating: "2.5",
        },
        {
            id: 318723,
            title: "The Northman",
            image: "https://image.movieglu.com/318723/318723h1.jpg",
            duration: "136",
            rating: "3.5",
        },
        {
            id: 329462,
            title: "Family Camp",
            image: "https://image.movieglu.com/329462/329462h1.jpg",
            duration: "111",
            rating: "0",
        },
        {
            id: 307292,
            title: "The Unbearable Weight of Massive Talent",
            image: "https://image.movieglu.com/307292/307292h1.jpg",
            duration: "106",
            rating: "2.5",
        },
    ],
};

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

function Home(props) {
    const { Meta } = Card;

    const { auth } = props;

    // const [response, setResponse] = useState(defaultResponse);

    const [response, setResponse] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // todo: uncomment this when HomeLambda is ready
        setIsLoading(true);
        apiGetHome();
    }, []);

    const apiGetHome = () => {

        // note: test code for isLoading
        // sleep(10000).then(() => {
        //     setResponse(defaultResponse);
        //     setIsLoading(false);
        // });

        // return;

        let url = `${ENDPOINT}/home`;
        const API_KEY = process.env["REACT_APP_AWS_API_KEY"];
        // console.log('API KEY', API_KEY)

        const opt = {
            method: "GET",
            url: url,
            headers: {
                "x-api-key": API_KEY,
                "x-amz-meta-user":
                    auth.user === null ? "" : auth.user.attributes.sub,
            },
        };

        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Homepage request sent.");

                    console.log(res.data);

                    // todo: uncomment this when HomeLambda is ready
                    setResponse(res.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                message.error("Fetch Homepage failed!");
                console.log("Fetch Homepage failed: ", err.message);

                setIsLoading(false)
            });

        
    };

    const renderRecommendation = () => {
        if (response === null) {
            return null;
        }

        let card = null;

        return (
            <div>
                {response.recommendation.length > 0 ? (
                    <div className="home-title">
                        {" "}
                        Recommendation for you...{" "}
                    </div>
                ) : null}
                <div className="home-div">
                    <Row gutter={[24, 24]}>
                        {response.recommendation.map((d) => (
                            <Col
                                span={4}
                                xs={20}
                                sm={16}
                                md={12}
                                lg={8}
                                xl={4}
                                key={d["id"]}
                            >
                                <Card
                                    hoverable
                                    cover={
                                        <img alt="example" src={d["image"]} />
                                    }
                                    actions={[
                                        <a
                                            key="view"
                                            onClick={onClickMovieCard}
                                        >
                                            view
                                        </a>,
                                    ]}
                                    bodyStyle={{ padding: 5 }}
                                    data-id={d["id"]}
                                    className="movie-card"
                                >
                                    {/* <div slot="title"> */}
                                    <Row justify="space-between">
                                        <Col>
                                            <span>
                                                <StarTwoTone twoToneColor="#eb2f96" />
                                                {d["rating"]}
                                            </span>
                                        </Col>
                                        <Col>{d["duration"]} mins</Col>
                                    </Row>
                                    {/* </div> */}
                                    <div className="word-wrap home-movie-name">
                                        {d["title"]}
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        );
    };

    const renderNowShowing = () => {
        // todo: if condition

        if (response === null) {
            return <Empty />;
        }
        let card = null;

        return (
            <Row gutter={[24, 24]}>
                {response.nowshowing.map((d) => (
                    <Col
                        span={4}
                        xs={20}
                        sm={16}
                        md={12}
                        lg={8}
                        xl={4}
                        key={d["id"]}
                    >
                        <Card
                            hoverable
                            cover={<img alt="example" src={d["image"]} />}
                            actions={[
                                <a key="view" onClick={onClickMovieCard}>
                                    view
                                </a>,
                            ]}
                            bodyStyle={{ padding: 5 }}
                            data-id={d["id"]}
                            className="movie-card"
                        >
                            {/* <div slot="title"> */}
                            <Row justify="space-between">
                                <Col>
                                    <span>
                                        <StarTwoTone twoToneColor="#eb2f96" />
                                        {d["rating"]}
                                    </span>
                                </Col>
                                <Col>{d["duration"]} mins</Col>
                            </Row>
                            {/* </div> */}
                            <div className="word-wrap home-movie-name">
                                {d["title"]}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    };

    const onClickMovieCard = (e) => {
        console.log("event", e);

        console.log("auth.user", auth.user);

        if (auth.user === null) {
            window.location.href = "/login";
            return;
        }

        const parent = e.target.closest(".movie-card");
        console.log("parent", parent);

        let movie_id = parent.getAttribute("data-id");

        // let movie_id = e.target.getAttribute("data-id");
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
                            <Spin size="large"/>
                        </Col>
                    </Row>
                </div>
            ) : (
                <div>
                    <div className="detail-div">
                        <br />
                        <div className="home-title"> Films Now Showing... </div>
                        <div className="home-div">{renderNowShowing()}</div>
                        <br />
                        {renderRecommendation()}
                        <br />
                    </div>
                </div>
            )}
            <br />
        </div>
    );
}

export default Home;
