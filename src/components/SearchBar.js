import React, {useEffect}from 'react';
import {Col, Row, Input, Button} from "antd";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophoneLines } from '@fortawesome/free-solid-svg-icons'

import $ from 'jquery'

import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

function SearchBar(props) {
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const suffix = (
        <FontAwesomeIcon id="svg" icon={faMicrophoneLines}/>
    );

    const voice_icon_mouseover= () =>{
        document.getElementById("svg").style.cursor = "pointer";
    }

    const voice_icon_mouseout= () =>{
        document.getElementById("svg").style.cursor = "default";
    }

    const voice_icon_onclick = () => {
        console.log('clicked. Listening is ' + listening)
        if(listening == false){
            // console.log('listening is false')
            SpeechRecognition.startListening()
        } else {
            // console.log('listening is true.')
            SpeechRecognition.stopListening()
        }
    }


    useEffect(() => {

        // console.log('aws api key', process.env['REACT_APP_AWS_API_KEY'])
        // console.log('google api key', process.env["REACT_APP_GOOGLE_API_KEY"])

        let svg = document.getElementById('svg')
        svg.addEventListener('click', voice_icon_onclick)
        svg.addEventListener('mouseover', voice_icon_mouseover)
        svg.addEventListener('mouseout', voice_icon_mouseout)
        return ()=> {
            svg.removeEventListener('click',voice_icon_onclick)
            svg.removeEventListener('mouseover', voice_icon_mouseover)
            svg.removeEventListener('mouseout', voice_icon_mouseout)
        }
    }, []);


    useEffect(()=> {

        let svg = document.getElementById('svg')
        // console.log('listening is ' + listening)

        svg.addEventListener('click', voice_icon_onclick)
        svg.addEventListener('mouseover', voice_icon_mouseover)
        svg.addEventListener('mouseout', voice_icon_mouseout)

        if(listening === true) {
            console.log('listening is on.')

            // note: change color and style
            console.log(svg.style)
            // svg.style.color = "red";
            svg.classList.add('fa-beat-fade')

        } else {
            console.log('listening is off.')

            // note: change color and style
            console.log(svg.style)
            svg.style.color = "black";
            svg.classList.remove('fa-beat-fade')

            // note: set voice text
            $('#search-bar').val(transcript)

        }

        return ()=> {
            svg.removeEventListener('click',voice_icon_onclick)
            svg.removeEventListener('mouseover', voice_icon_mouseover)
            svg.removeEventListener('mouseout', voice_icon_mouseout)
        }
    }, [listening])


    const onSearch = (labels) =>{
        console.log(labels);
        // todo: handle Search

    }

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
            <Input id="search-bar"
                    placeholder="Enter To Search Movies"
                    // enterButton
                    size="large"
                    suffix={suffix}
                    prefix={<SearchOutlined/>}
                    onPressEnter={onSearch}
                    // value={transcript}
            />
    );
}

export default SearchBar;