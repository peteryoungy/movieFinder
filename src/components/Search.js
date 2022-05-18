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
import { StarTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";

function Search(props) {
    const { Meta } = Card;

    const search_result = useSelector((state) => state.search_result);

    const { auth } = props;

    useEffect(() => {
        console.log("search result", search_result);
    }, [search_result]);

    const renderSearch = () => {
        if (search_result.films === null) {
            return <Empty />;
        }

        let card = null;
        return (
            <Row gutter={[24, 24]}>
                {search_result.films.map((d) => (
                    <Col span={4} xs={20} sm={16} md={12} lg={8} xl={4}>
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
            <div className="detail-div">
                <br />
                <div className="home-title"> Search results</div>
                <div className="home-div">{renderSearch()}</div>
                <br />
            </div>
        </div>
    );
}

export default Search;
