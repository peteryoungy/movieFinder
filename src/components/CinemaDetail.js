import React, { useEffect } from "react";
import { Row, Col, Space, Tabs, Button, Tag, Tooltip } from "antd";
import { EnvironmentOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const { TabPane } = Tabs;

function CinemaDetail(props) {
    const { cinema_id } = useParams();

    console.log("cinema_id", cinema_id);

    const response = {
        id: "2",
        cinemaName: "Regal E-Walk 4DX & RPX",
        image: "https://picsum.photos/200/300",
        distance: "0.8",
        address: "247 W 42nd St, New York, NY 10036",
        link: "https://www.google.com",
        showtime: {
            0: [
                {
                    id: "1",
                    title: "Movie Name 1",
                    duration: "90",
                    times: [
                        {
                            start_time: "14:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "15:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "16:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "18:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "20:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "21:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "23:30",
                            end_time: "20:45",
                        },
                    ],
                },
                {
                    id: "2",
                    title: "Movie Name 2",
                    duration: "90",
                    times: [
                        {
                            start_time: "14:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "15:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "16:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "18:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "20:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "21:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "23:30",
                            end_time: "20:45",
                        },
                    ],
                },
                {
                    id: "3",
                    title: "Movie Name 3",
                    duration: "90",
                    times: [
                        {
                            start_time: "14:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "15:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "16:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "18:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "20:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "21:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "23:30",
                            end_time: "20:45",
                        },
                    ],
                },
            ],
            1: [
                {
                    id: "4",
                    title: "Movie Name 4",
                    duration: "90",
                    times: [
                        {
                            start_time: "14:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "15:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "16:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "18:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "20:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "21:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "23:30",
                            end_time: "20:45",
                        },
                    ],
                },
                {
                    id: "5",
                    title: "Movie Name 5",
                    duration: "90",
                    times: [
                        {
                            start_time: "14:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "15:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "16:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "18:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "20:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "21:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "23:30",
                            end_time: "20:45",
                        },
                    ],
                },
                {
                    id: "6",
                    title: "Movie Name 6",
                    duration: "90",
                    times: [
                        {
                            start_time: "14:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "15:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "16:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "18:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "20:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "21:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "23:30",
                            end_time: "20:45",
                        },
                    ],
                },
            ],
            2: [
                {
                    id: "7",
                    title: "Movie Name 7",
                    duration: "90",
                    times: [
                        {
                            start_time: "14:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "15:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "16:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "18:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "20:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "21:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "23:30",
                            end_time: "20:45",
                        },
                    ],
                },
                {
                    id: "8",
                    title: "Movie Name 8",
                    duration: "90",
                    times: [
                        {
                            start_time: "14:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "15:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "16:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "18:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "20:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "21:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "23:30",
                            end_time: "20:45",
                        },
                    ],
                },
                {
                    id: "9",
                    title: "Movie Name 9",
                    duration: "90",
                    times: [
                        {
                            start_time: "14:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "15:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "16:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "18:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "20:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "21:30",
                            end_time: "20:45",
                        },
                        {
                            start_time: "23:30",
                            end_time: "20:45",
                        },
                    ],
                },
            ],
        },
    };

    // todo:
    //  1.like function

    const onTabChange = (key) => {
        console.log("tab key", key);
    };

    const getDateByOffset = (offset) => {
        const formatTwoDigitCode = (number) => {
            if (number < 10) {
                return "0" + number;
            } else {
                return "" + number;
            }
        };

        let dateObj = new Date();
        dateObj.setDate(dateObj.getDate() + offset);
        console.log("dateObj", dateObj);

        let date_str = `${dateObj.getFullYear()}-${formatTwoDigitCode(
            dateObj.getMonth() + 1
        )}-${formatTwoDigitCode(dateObj.getDate())}`;

        // console.log('day', dateObj.getDate())
        // console.log("date_str", date_str);

        return date_str;
        // console.log('today_iso', today.toISOString()) // att: only UTC supported
        // console.log('today', today)
        // console.log('year', today.getFullYear())
        // console.log('month', today.getMonth())
        // console.log('day', today.getDay())
    };

    useEffect(() => {
        // getDateByOffset(2)

        console.log("day after tomorrow", getDateByOffset(2));
        // note: 2. Register Card Events

        let movie_name = document.getElementsByClassName("movie-name");

        for (let i = 0; i < movie_name.length; i++) {
            movie_name[i].addEventListener("click", responseNameClick);
        }

        return () => {
            let movie_name = document.getElementsByClassName("movie-name");

            for (let i = 0; i < movie_name.length; i++) {
                movie_name[i].removeEventListener("click", responseNameClick);
            }
        };
    }, []);

    const responseNameClick = (e) => {
        console.log("event", e);

        let movie_id = e.target.getAttribute("data-id");
        console.log("movie_id", movie_id);
        window.location.href = "/movie/" + movie_id;
    };

    const displayContent = (order) => {
        console.log("order", order);

        return response["showtime"][order].map((movie) => (
            <div
                className="pointer detail-list-card-static"
                key={movie["id"]}
                data-id={movie.id}
            >
                <Row className="padding-left">
                    <Col>
                        <span
                            className="bold-600 span-padding-right-20 movie-name"
                            data-id={movie.id}
                        >
                            {" "}
                            {movie.title}
                        </span>

                        <span className="detail-small">
                            {movie.duration} mins{" "}
                        </span>
                    </Col>
                </Row>
                <Row className="padding-left">
                    <Col>
                        <div className="detail-sub-title">
                            {movie.times.map((slot, index) => (
                                <span
                                    className="span-padding-right-10"
                                    key={index}
                                >
                                    {slot.start_time}
                                </span>
                            ))}
                        </div>
                    </Col>
                </Row>
            </div>
        ));
    };

    return (
        <div className="bg-1">
            <br />
            <div className="detail-div">
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={8}>
                        <img
                            src={response.image}
                            className="detail detail-img"
                        />
                    </Col>

                    <Col span={14}>
                        <div>
                            <div className="detail detail-title">
                                <span className="span-padding-right-10">
                                    {" "}
                                    {response.cinemaName}
                                </span>
                                <Tag color={"magenta"} className="detail">
                                    {" "}
                                    Cinema{" "}
                                </Tag>
                            </div>

                            <div className="detail detail-sub-title">
                                <Space>
                                    <span className="span-padding-right-10">
                                        {response.address}
                                    </span>

                                    <Tooltip
                                        title="View In Google Map"
                                        placement="right"
                                        color={"#f5c518"}
                                        className="pointer"
                                    >
                                        <Tag
                                            icon={<EnvironmentOutlined />}
                                            className="detail-default"
                                        >
                                            {response.distance} miles
                                        </Tag>
                                    </Tooltip>
                                </Space>
                            </div>

                            <div className="detail-tab-div">
                                <Tabs
                                    defaultActiveKey="1"
                                    onChange={onTabChange}
                                    type="line"
                                    className="detail-tab"
                                >
                                    <TabPane tab={getDateByOffset(0)} key="1">
                                        <div className="detail-movie-list">
                                            {displayContent(0)}
                                        </div>
                                    </TabPane>
                                    <TabPane tab={getDateByOffset(1)} key="2">
                                        {/* {displayContent(1)} */}
                                        <div className="detail-movie-list">
                                            {displayContent(1)}
                                        </div>
                                    </TabPane>
                                    <TabPane tab={getDateByOffset(2)} key="3">
                                        {/* {displayContent(2)} */}
                                        <div className="detail-movie-list">
                                            {displayContent(2)}
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </div>

                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <div className="btn-nav-div">
                                <Button type="primary" size="large" className="btn-nav" onClick={() => window.location.href=response.link}>
                                    Buy Tickets Here!
                                    <RightCircleOutlined />
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default CinemaDetail;
