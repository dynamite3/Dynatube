import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Image from 'react-bootstrap/Image'

import { apiendpoint } from './UploadVideoPage';
import moment from "moment"
import { useHistory } from "react-router-dom";
import { Col } from 'react-bootstrap';

import {

    Switch,
    Route,
    useParams
} from "react-router-dom";

function SideVideoPage() {
    let history = useHistory();

    const [sideExploreVideos, setSideExploreVideos] = useState([])

    const { videoId } = useParams();

    function getallvideos() {
        fetch(apiendpoint + "/video/uploadVideo",
            {
                method: "GET",
                headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
            })
            .then((data) => data.json())
            .then((d) => {

                d = d.filter((e) => e._id != videoId)
                console.log(d)
                setSideExploreVideos(d)
            })
    }
    useEffect(() => {
        getallvideos()
    }, [videoId])




    return (
        <SideVideoPageStyled>


            {
                sideExploreVideos.map((e) =>
                    <>
                        <div className="row rsdr1"
                            onClick={() => history.push("/content/DetailVideo/" + e._id)}
                        >
                            <Col className="sidevideocol">
                            <Image className="disimg" src={ e.thumbnail} fluid className="sidevideos_thumnail" />

                            </Col>
                            <Col className="sidevideo-title ">
                            <h5>{e.title}</h5>
                                <h6>by : {e.writer.FirstName + " " + e.writer.LastName}</h6>
                                <h6>{moment(e.createdAt).format("Do MMM YYYY")}</h6>
                                <div className="duration">{e.duration}</div>
                            </Col>

                            {/* <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                <Image className="disimg" src={apiendpoint + "/" + e.thumbnail} fluid className="sidevideos_thumnail" />
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-5 col-xl-5 sidevideo-title ">
                                <h5>{e.title}</h5>
                                <h6>by : {e.writer.FirstName + " " + e.writer.LastName}</h6>
                                <h6>{moment(e.createdAt).format("Do MMM YYYY")}</h6>
                            </div> */}
                        </div>
                    </>
                )
            }



        </SideVideoPageStyled>
    )
}

const SideVideoPageStyled = styled.div`


.rsdr1{
    padding: 4px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    margin-top:1rem;
    display: flex;
    align-items: center;

    .sidevideos_thumnail{
        max-height: 80px;
    }
}
.sidevideo-title{
    h6{  
    font-size: 12px;
    }
}
.duration{
    background: cornsilk;
    margin-left: auto;
    float: right;
}

.sidevideocol{
    display: flex;
    justify-content: center;
}

`;

export default SideVideoPage
