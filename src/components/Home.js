import { Card } from 'antd';
import { Row, Col, Image, Rate, Tag, Empty, notification, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ENDPOINT } from "../constants";
import { StarTwoTone} from '@ant-design/icons';
import { auth0SignInButton } from 'aws-amplify';


function Home(props) {

    const { Meta } = Card;

    const {auth} = props;

    const [response, setResponse] = useState({
        nowshowing: [
            {
                id: "1",
                title: "film1",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "2",
                title: "film2",
                image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
                duration: "90",
                rating: "5",
            },
            {
                id: "3",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "4",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "5",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "6",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "6",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "1",
                title: "film1",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "2",
                title: "film2",
                image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
                duration: "90",
                rating: "5",
            },
            {
                id: "3",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "4",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "5",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "6",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "6",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "1",
                title: "film1",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "2",
                title: "film2",
                image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
                duration: "90",
                rating: "5",
            },
            {
                id: "3",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "4",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "5",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "6",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },
            {
                id: "6",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
                rating: "5",
            },

        ],
    });

    useEffect(() => {

        // todo: uncomment this when HistoryLambda is ready
        apiGetHome()
    }, []);

    const apiGetHome = () => {

        let url = `${ENDPOINT}/home`;

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
                    console.log("Homepage request sent.");

                    console.log(res.data);

                    // todo: uncomment this when HomeLambda is ready
                    // setResponse(res.data.body)
                }
            })
            .catch((err) => {
                message.error("Fetch Homepage failed!");
                console.log("Fetch Homepage failed: ", err.message);
            });
    }


    const renderHome = () => {
        // todo: if condition
        // if(response === null){
        //     return <Empty/>
        // }
        let card = null;

        return (
            <Row gutter={[24,24]}>          
                {response.nowshowing.map((d) => 
                    <Col span={4} xs={20} sm={16} md={12} lg={8} xl={4}>
                        <Card
                            hoverable
                            cover={<img 
                                alt="example" 
                                src={d["image"]} />
                            }
                            actions={[
                                <a key="view"
                                onClick={onClickMovieName}
                                >view</a>,
                              ]}
                            body-style='{padding:0}'
     
                        >
                            <div slot="title">
                                <StarTwoTone twoToneColor="#eb2f96" />{d["rating"]} {d["duration"]}</div>
                            {d["title"]}
                        </Card>
                    </Col>
                )}
            
            </Row>
        );
    };

    const onClickMovieName = (e) => {
        console.log("event", e);

        let movie_id = e.target.getAttribute("data-id");
        console.log("movie_id", movie_id);
        window.location.href = "/movie/" + movie_id;
    };
    
    return (
        <div className='bg-2'>
            <br />
            <div className="detail-div">
                <br />
                <div className="home-title"> Film now showing... </div>
                <div className="home-div">{renderHome()}</div>
                <br/>
            </div>
            <div className="detail-div">
                <br />
                <div className="home-title"> Recommendation for you... </div>
                <div className="home-div">{renderHome()}</div>
                <br/>
            </div>
            <br/>
        </div>
    );
}

export default Home;