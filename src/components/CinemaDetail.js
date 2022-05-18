import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Space,
    Tabs,
    Button,
    Tag,
    Tooltip,
    Drawer,
    message,
    Empty,
    Spin,
    Alert,
} from "antd";
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

const { TabPane } = Tabs;

const libraries = ["places", "drawing", "geometry"];
const travelMode = "DRIVING";

const defaultResponse = {
    id: "11",
    cinemaName: "AMC Loews 84th Street 6",
    image: "https://lh5.googleusercontent.com/p/AF1QipMa9KBx4Z3o7sOfZ46a83HDg_0178UhDG8Sx5-w=w203-h152-k-no",
    address: "2310 Broadway,New York,NY 10024",
    link: "",
    Des_pos: {
        lat: 40.786598,
        lng: -73.9776,
    },
    showtime: {
        0: [
            {
                id: 300783,
                title: "The Bad Guys",
                duration: "100",
                times: [
                    {
                        start_time: "22:45",
                        end_time: "00:50",
                    },
                ],
            },
        ],
        1: [
            {
                id: 296301,
                title: "Doctor Strange in the Multiverse of Madness",
                duration: "126",
                times: [
                    {
                        start_time: "10:45",
                        end_time: "13:16",
                    },
                    {
                        start_time: "13:05",
                        end_time: "15:36",
                    },
                    {
                        start_time: "13:40",
                        end_time: "16:11",
                    },
                    {
                        start_time: "16:35",
                        end_time: "19:06",
                    },
                    {
                        start_time: "19:30",
                        end_time: "22:01",
                    },
                    {
                        start_time: "21:20",
                        end_time: "23:51",
                    },
                    {
                        start_time: "22:30",
                        end_time: "01:01",
                    },
                ],
            },
            {
                id: 300783,
                title: "The Bad Guys",
                duration: "100",
                times: [
                    {
                        start_time: "11:25",
                        end_time: "13:30",
                    },
                    {
                        start_time: "13:50",
                        end_time: "15:55",
                    },
                    {
                        start_time: "16:20",
                        end_time: "18:25",
                    },
                    {
                        start_time: "18:50",
                        end_time: "20:55",
                    },
                    {
                        start_time: "22:45",
                        end_time: "00:50",
                    },
                ],
            },
            {
                id: 310966,
                title: "Sonic the Hedgehog 2",
                duration: "122",
                times: [
                    {
                        start_time: "10:30",
                        end_time: "12:57",
                    },
                    {
                        start_time: "13:20",
                        end_time: "15:47",
                    },
                    {
                        start_time: "16:20",
                        end_time: "18:47",
                    },
                    {
                        start_time: "19:10",
                        end_time: "21:37",
                    },
                    {
                        start_time: "21:15",
                        end_time: "23:42",
                    },
                ],
            },
            {
                id: 197407,
                title: "Fantastic Beasts: The Secrets of Dumbledore",
                duration: "142",
                times: [
                    {
                        start_time: "11:30",
                        end_time: "14:17",
                    },
                    {
                        start_time: "14:45",
                        end_time: "17:32",
                    },
                    {
                        start_time: "18:00",
                        end_time: "20:47",
                    },
                    {
                        start_time: "22:00",
                        end_time: "00:47",
                    },
                ],
            },
        ],
        2: [
            {
                id: 296301,
                title: "Doctor Strange in the Multiverse of Madness",
                duration: "126",
                times: [
                    {
                        start_time: "10:00",
                        end_time: "12:31",
                    },
                    {
                        start_time: "12:55",
                        end_time: "15:26",
                    },
                    {
                        start_time: "15:50",
                        end_time: "18:21",
                    },
                    {
                        start_time: "18:15",
                        end_time: "20:46",
                    },
                    {
                        start_time: "18:45",
                        end_time: "21:16",
                    },
                    {
                        start_time: "21:10",
                        end_time: "23:41",
                    },
                    {
                        start_time: "21:40",
                        end_time: "00:11",
                    },
                ],
            },
            {
                id: 300783,
                title: "The Bad Guys",
                duration: "100",
                times: [
                    {
                        start_time: "10:10",
                        end_time: "12:15",
                    },
                    {
                        start_time: "13:30",
                        end_time: "15:35",
                    },
                    {
                        start_time: "15:55",
                        end_time: "18:00",
                    },
                    {
                        start_time: "19:45",
                        end_time: "21:50",
                    },
                    {
                        start_time: "22:10",
                        end_time: "00:15",
                    },
                ],
            },
            {
                id: 310966,
                title: "Sonic the Hedgehog 2",
                duration: "122",
                times: [
                    {
                        start_time: "10:40",
                        end_time: "13:07",
                    },
                    {
                        start_time: "12:35",
                        end_time: "15:02",
                    },
                    {
                        start_time: "16:15",
                        end_time: "18:42",
                    },
                    {
                        start_time: "19:05",
                        end_time: "21:32",
                    },
                    {
                        start_time: "21:45",
                        end_time: "00:12",
                    },
                ],
            },
            {
                id: 197407,
                title: "Fantastic Beasts: The Secrets of Dumbledore",
                duration: "142",
                times: [
                    {
                        start_time: "10:00",
                        end_time: "12:47",
                    },
                    {
                        start_time: "13:10",
                        end_time: "15:57",
                    },
                    {
                        start_time: "15:25",
                        end_time: "18:12",
                    },
                    {
                        start_time: "18:35",
                        end_time: "21:22",
                    },
                    {
                        start_time: "21:55",
                        end_time: "00:42",
                    },
                ],
            },
        ],
    },
};

const defaultNull = null;

function CinemaDetail(props) {
    const { auth } = props;

    const [visible, setVisible] = useState(false);
    const [diResponse, setdiResponse] = useState(null);

    // todo: set default as null
    // const [response, setResponse] = useState(defaultResponse)

    const [response, setResponse] = useState(defaultNull);

    const [isLoading, setIsLoading] = useState(false);

    const user_pos = useSelector((state) => state.user_pos);

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
        setIsLoading(true);

        console.log("cinema_id", cinema_id);
        // let url = `${ENDPOINT}/cinema/${cinema_id}`;
        let url = `${process.env["REACT_APP_API_GATEWAY_ENDPOINT"]}/cinema/${cinema_id}`;
        const API_KEY = process.env["REACT_APP_AWS_API_KEY"];

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
                    console.log("res.data", res.data);

                    setResponse(res.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                message.error("Fetch cinema info failed!");
                console.log("Fetch cinema info failed: ", err.message);

                setResponse(defaultNull);
                setIsLoading(false);
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
        if (response === null) {
            return <Empty />;
        }

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
                        {/* <Marker
                            // icon={station === 0 ? robotHIcon : robotIcon}
                            position={user_pos}
                        />
                        <Marker
                            // icon={station === 1 ? robotHIcon : robotIcon}
                            position={response.Des_pos}
                        /> */}

                        {
                            <DirectionsService
                                // required
                                options={{
                                    destination: response.Des_pos,
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
        if (response === null) {
            return <Empty />;
        }
        return (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {/* <Col span={8}>
                    <img src={response.image} className="detail detail-img" />
                </Col> */}
                <Col span={1}></Col>
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
                                        {/* {response.distance} miles */}
                                        View in Google Map
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
                        {/* <div className="btn-nav-div">
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
                        </div> */}
                    </div>
                </Col>
            </Row>
        );
    };

    return (
        <div className="bg-1">
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
                    <div className="detail-div">{renderCinemaDetail()}</div>
                    <br />
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
                        {user_pos === null ? (
                            <Alert
                                message="Cannot get your current location"
                                description="To get route suggestions, you must authorize
                                location permissions."
                                type="warning"
                                showIcon
                            />
                        ) : (
                            renderMap()
                        )}
                    </Drawer>
                </div>
            )}
        </div>
    );
}

export default CinemaDetail;
