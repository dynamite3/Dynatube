import React from 'react'
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';

import {

    Switch,
    Route,
    useParams,
    useHistory
} from "react-router-dom";
import { useState, useEffect } from "react"
import { apiendpoint } from "./UploadVideoPage";
import { SupervisedUserCircleOutlined } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import moment from "moment"

import random_bg_color from './components_for_pages/randomColor';



import SideVideoPage from './SidePage';
import Subcriber from './components_for_pages/Subcriber';
import CommentSection from './components_for_pages/Comment';
import LikeDislike from './components_for_pages/LikeDislike';

function DetailVideoPage() {

    let history = useHistory();

    const { videoId } = useParams();
    console.log(videoId);

    const [Video, setVideo] = useState([])

    function getvideo() {
        fetch(apiendpoint + "/content/DetailVideo/" + videoId,
            {
                method: "GET",
                headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
            })
            .then((data) => data.json())
            .then((d) => {
                console.log(d)
                // console.log('\\\\\\\\\\\\\\\\\\\\\\')
                setVideo(d)
                // console.log('\\\\\\\\\\\\\\\\\\\\\\')
            })

    }
    console.log(Video)

    useEffect(() => {
        getvideo()
    }, [videoId])


    if (Video.writer) {
        return (

            <DetailVideoPageStyled>



                <div className="row dvr1">

                    <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 ">

                        <div className="postPage" style={{ width: '100%', padding: '1rem 1em' }}>
                            <video style={{ width: '100%' }} src={`${Video.filePath}`} controls></video>
                            <LikeDislike />
                        </div>
                        <div className="detail-video_abtvideo">
                                
                                {/* <h6>Views : 1.2k</h6> */}
                                <h6>created at: {moment(Video.createdAt).format("Do MMM YYYY")}</h6>
                        </div>



                        <div className="v-des">
                            
                            <h2>{Video.title}</h2>
                            <div className="detail-video_title">
                                
                                <div className="detail-video_bywhom" 
                                onClick={()=>history.push("/content/UserChannel/"+Video.writer._id)}
                                >
                                    
                                        <Avatar
                                        style={{background : random_bg_color()}}
                                        >{Video.writer.FirstName[0]+Video.writer.LastName[0]}</Avatar>
                                        <div>
                                        <b>{Video.writer.FirstName + " " + Video.writer.LastName}</b>

                                        </div>
                                    
                                </div>


                                <Subcriber subscribeTo={Video.writer._id} subscribeFrom={JSON.parse(localStorage.getItem('current-user'))}/>


                            </div>
                            <h6 style={{margin:"1rem"}}>DESCRIPTION: {Video.description} </h6>

                            

                        </div>

                        <CommentSection/>
                    </div>

                  

                    <div className="col-sm-8 col-md-8 col-lg-4 col-xl-4" style={{}}>
                        <SideVideoPage />
                    </div>


                </div>

            </DetailVideoPageStyled>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }

}


const DetailVideoPageStyled = styled.div`

.dvr1{
    display:flex;
    justify-content: center; 
}

margin-top:2rem;
margin-bottom:2rem;


padding:inherit;
.detail-video_abtvideo{
    display:flex;
    justify-content: flex-end;
    gap:1rem;
    
}

.v-des{
    padding:.5rem;
    background:rgba(228, 233, 237, .7);
}

.detail-video_bywhom{
    display: flex;
    gap: 1rem;
    align-items: center;
}
}

.postPage{
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}

.detail-video_title{
    display:flex;
    justify-content: space-between;
    align-items: center;
}

.videocols{
    margin-top:1rem;
}
`;


export default DetailVideoPage
