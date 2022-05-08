import React, { useEffect, useState } from "react";
import { Row, Col, Space, Tabs, Button, Tag, Tooltip, Drawer, message} from "antd";
import {
    EnvironmentOutlined,
    RightCircleOutlined,
    CloseOutlined,
    CloseCircleFilled,
    CloseCircleOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import {
    useLoadScript,
    GoogleMap,
    Marker,
    DirectionsService,
    DirectionsRenderer,
} from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { setUserPos } from "../state/reducers/UserPosSlice";
import axios from "axios";
import { ENDPOINT } from "../constants";

const { TabPane } = Tabs;

const libraries = ["places", "drawing", "geometry"];
const travelMode = "DRIVING";

function CinemaDetail(props) {
    const [visible, setVisible] = useState(false);
    const [diResponse, setdiResponse] = useState(null);
    // todo: set default as null
    const [response, setResponse] = useState({
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
    });

    const user_pos = useSelector((state) => state.user_pos);

    // todo: get des_pos or not
    const des_pos = {
        lat: 40.7578289503393,
        lng: -73.98917204824191,
    };

    // Get cinema_id
    const { cinema_id } = useParams();
    console.log("cinema_id", cinema_id);

    // Load Goolge Map
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env["REACT_APP_GOOGLE_API_KEY"],
        libraries: libraries,
    });

    useEffect(() => {
        // console.log("api key", process.env["REACT_APP_GOOGLE_API_KEY"]);

        console.log("user_pos", user_pos);

        apiGetCinema();
    }, []);

    const apiGetCinema = () => {

        console.log('cinema_id', cinema_id)
        let url = `${ENDPOINT}/cinema/${cinema_id}`;

        const API_KEY = process.env["REACT_APP_AWS_API_KEY"]

        const opt = {
            method: "GET",
            url: url,
            headers: {
                "x-api-key": API_KEY,
            },
        };

        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Cinema request sent.");

                    console.log(res.data);

                    // todo: uncomment this when CinemaLambda is ready
                    // setResponse(res.data)
                }
            })
            .catch((err) => {
                message.error("Fetch cinema info failed!");
                console.log("Fetch cinema info failed: ", err.message);
            });
    };

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
        // console.log("dateObj", dateObj);

        let date_str = `${dateObj.getFullYear()}-${formatTwoDigitCode(
            dateObj.getMonth() + 1
        )}-${formatTwoDigitCode(dateObj.getDate())}`;

        return date_str;
        // console.log('today_iso', today.toISOString()) // att: only UTC supported
        // console.log('today', today)
        // console.log('year', today.getFullYear())
        // console.log('month', today.getMonth())
        // console.log('day', today.getDay())
    };

    const onClickMovieName = (e) => {
        console.log("event", e);

        let movie_id = e.target.getAttribute("data-id");
        console.log("movie_id", movie_id);
        window.location.href = "/movie/" + movie_id;
    };

    const onClickDistanceButton = () => {
        // todo: When user_pos is empty, try to open the permission again
        setVisible(true);
    };

    const onCloseDrawer = () => {
        setVisible(false);
    };

    const directionsCallback = (response) => {
        console.log(response);

        if (response !== null) {
            if (response.status === "OK") {
                setdiResponse(response);
            } else {
                console.log("response: ", response);
            }
        }
    };

    const renderMap = () => {
        console.log("render Map", isLoaded);
        if (!isLoaded) {
            return <div>Loading....</div>;
        } else {
            return (
                <div>
                    <GoogleMap
                        // mapContainerStyle={containerStyle}
                        mapContainerClassName={"map-container"}
                        center={user_pos}
                        zoom={12}
                    >
                        <Marker
                            // icon={station === 0 ? robotHIcon : robotIcon}
                            position={user_pos}
                        />
                        <Marker
                            // icon={station === 1 ? robotHIcon : robotIcon}
                            position={des_pos}
                        />

                        {
                            <DirectionsService
                                // required
                                options={{
                                    destination: des_pos,
                                    origin: user_pos,
                                    travelMode: travelMode,
                                }}
                                // required
                                callback={directionsCallback}
                            />
                        }
                        {diResponse !== null && (
                            <DirectionsRenderer
                                // required
                                options={{
                                    directions: diResponse,
                                }}
                            />
                        )}
                    </GoogleMap>
                </div>
            );
        }
    };

    const renderContent = (order) => {
        console.log("render content");
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
                            onClick={onClickMovieName}
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

    const renderCinemaDetail = () => {
        console.log("render cinema detail");
        // todo: uncomment this
        // if(response === null){
        //     return <Empty/>
        // }
        return (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={8}>
                    <img src={response.image} className="detail detail-img" />
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
                                    className="pointer spot"
                                >
                                    <Button
                                        icon={<EnvironmentOutlined />}
                                        className="detail-default"
                                        size="small"
                                        onClick={onClickDistanceButton}
                                    >
                                        {response.distance} miles
                                    </Button>
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
                                        {renderContent(0)}
                                    </div>
                                </TabPane>
                                <TabPane tab={getDateByOffset(1)} key="2">
                                    <div className="detail-movie-list">
                                        {renderContent(1)}
                                    </div>
                                </TabPane>
                                <TabPane tab={getDateByOffset(2)} key="3">
                                    <div className="detail-movie-list">
                                        {renderContent(2)}
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>

                        <br />
                        <br />
                        <br />
                        <br />
                        <div className="btn-nav-div">
                            <Button
                                type="primary"
                                size="large"
                                className="btn-nav"
                                onClick={() =>
                                    (window.location.href = response.link)
                                }
                            >
                                Buy Tickets Here!
                                <RightCircleOutlined />
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    };

    return (
        <div className="bg-1">
            <br />
            <div className="detail-div">{renderCinemaDetail()}</div>

            <Drawer
                title={"Position Of Cinema"}
                placement="right"
                // size={"large"}
                width={550}
                onClose={onCloseDrawer}
                visible={visible}
                closeIcon={
                    <CloseOutlined
                        style={{ color: "#f5c518", fontSize: "15px" }}
                    />
                }
                className={"primary"}
            >
                {renderMap()}
            </Drawer>

            {/* {!visible
                ? null
                : (
                    displayMap()
                )
            } */}
        </div>
    );
}

export default CinemaDetail;
