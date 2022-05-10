import { Card } from 'antd';
import { Row, Col, Image, Rate, Tag, Empty, notification, message } from "antd";
import React, { useEffect, useRef, useState } from "react";


function Home(props) {

    const { Meta } = Card;

    const [response, setResponse] = useState({
        nowshowing: [
            {
                id: "1",
                title: "film1",
                image: "https://picsum.photos/200/300",
                duration: "90",
            },
            {
                id: "2",
                title: "film2",
                image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
                duration: "90",
            },
            {
                id: "3",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
            },
            {
                id: "4",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
            },
            {
                id: "5",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
            },
            {
                id: "6",
                title: "film3",
                image: "https://picsum.photos/200/300",
                duration: "90",
            },


        ],
    });

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
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
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
            <br/>
        </div>
    );
}

export default Home;