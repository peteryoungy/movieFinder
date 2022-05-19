import React, { useEffect } from "react";
import { Col, Row, Input, Button, message } from "antd";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneLines } from "@fortawesome/free-solid-svg-icons";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResult } from "../state/reducers/SearchResultSlice";

const { Search } = Input;

function SearchBar(props) {
    const search_result = useSelector((state) => state.search_result);
    const dispatch = useDispatch();

    const { transcript, listening, browserSupportsSpeechRecognition } =
        useSpeechRecognition();

    const voice_icon_onclick = () => {
        console.log("clicked. Listening is " + listening);
        if (listening === false) {
            SpeechRecognition.startListening();
        } else {
            SpeechRecognition.stopListening();
        }
    };

    const suffix = (
        <FontAwesomeIcon
            id="svg"
            icon={faMicrophoneLines}
            className="pointer"
            onClick={voice_icon_onclick}
        />
    );

    useEffect(() => {
        let svg = document.getElementById("svg");

        if (listening === true) {
            console.log("listening is on.");

            // note: change color and style
            // console.log(svg.style)
            svg.style.color = "red";
            svg.classList.add("fa-beat-fade");
        } else {
            console.log("listening is off.");

            // note: change color and style
            // console.log(svg.style)
            svg.style.color = "black";
            svg.classList.remove("fa-beat-fade");

            // note: set voice text
            document.getElementById("search-bar").value = transcript;
        }
    }, [listening]);

    const onSearch = (e) => {
        // console.log('e', e)
        // console.log(e.target.defaultValue)
        const keyword = e.target.defaultValue;

        // clear search bar
        let search_bar = document.getElementById("search-bar");
        search_bar.value = "";

        // todo: uncomment this when SearchLambda is READY
        apiGetSearch(keyword);
    };

    const apiGetSearch = (keyword) => {
        console.log("Search Keyword", keyword);

        // let url = `${ENDPOINT}/search?q=${keyword}`;
        let url = `${process.env["REACT_APP_API_GATEWAY_ENDPOINT"]}/search?q=${keyword}`;
        const API_KEY = process.env["REACT_APP_AWS_API_KEY"];
        // console.log('API KEY', API_KEY)

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
                    console.log("Search request sent.");

                    console.log("res.data", res.data);

                    dispatch(setSearchResult(res.data));
                    window.location.href = "/search";
                }
            })
            .catch((err) => {
                message.error("Search movies failed!");
                console.log("Search movies failed: ", err.message);
            });
    };

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <Input
            id="search-bar"
            placeholder="Enter To Search Movies"
            // enterButton
            size="large"
            suffix={suffix}
            prefix={<SearchOutlined />}
            onPressEnter={onSearch}
            // value={transcript}
        />
    );
}

export default SearchBar;
