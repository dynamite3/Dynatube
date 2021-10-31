
import react, { useEffect, useState } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';

import { apiendpoint } from "./UploadVideoPage";

import Image from 'react-bootstrap/Image'
import Avatar from '@mui/material/Avatar';
import random_bg_color from "./components_for_pages/randomColor"

import moment from "moment"



function SubscriptionPage() {

    let history = useHistory();
    const [subScribedAllVideos,setsubScribedAllVideos]=useState([])
    
    
  
    function getallSubscibedvideos() {

        const cur_user=JSON.parse(localStorage.getItem('current-user'))
        const subscribeFrom=cur_user._id
        console.log(subscribeFrom)

        fetch(apiendpoint + "/video/subscribedVideo",
        {
            method: "POST",
            headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
            body: JSON.stringify({
                subscribeFrom
                }
               ),
        })
        .then((data) => data.json())
        .then((d)=>{
            console.log(d)
            setsubScribedAllVideos(d)
        })

    }
    
    useEffect(() => {
        getallSubscibedvideos()
        
    }, [])


    return (
        <SubscriptionPageStyled>

<div className="row expr1">
                <h1>Subscribed  Videos Section</h1>
            </div>

            <div className="row expr2">
                {

subScribedAllVideos.map((e) =>
                        // console.log(apiendpoint+"/"+e.thumbnail)
                        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 col-cards">
                            <div className="video-card" 
                            onClick={()=>history.push("/content/DetailVideo/"+e._id)}
                            
                            >
                                <Image className="disimg" src={ e.thumbnail} fluid style={{ height: "200px", width: "300px" }} />
                                <div className="card-des">


                                    <div>
                                        <h5>{e.title}</h5>
                                        <div className="bywhom">
                                            <div>
                                                <Avatar
                                                style={{background : random_bg_color()}}
                                                >{e.writer.FirstName[0]+e.writer.LastName[0]}</Avatar>
                                            </div>
                                            <b>{e.writer.FirstName + " " + e.writer.LastName}</b>
                                        </div>
                                        
                                        <div className="abtvideo">
                                            <h6>Views : 1.2k</h6>
                                            <h6>created at: {moment(e.createdAt).format("Do MMM YYYY")}</h6>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="duration">{e.duration}</div>

                            </div>
                        </div>

                    )}
            </div>
 
        </SubscriptionPageStyled>

    )
}

const SubscriptionPageStyled = styled.div`
.expr1{
    border-bottom:2px solid grey;
}
.duration{
    background: cornsilk;
    margin-left: auto;
}


.expr2{
    margin-top:2rem;


    .video-card{
        margin-top:1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

        img{
            box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
        }

        .card-des{
            display: flex;
            padding: .5rem;
            gap: .5rem;
            margin-top: 10px;

        }

        .bywhom{
            
            display:felx;
            gap: 1rem;
            align-items: center;
            justify-content: flex-start;
            p{
                margin: inherit;
            }
        }
        .abtvideo{
            display: flex;
        flex-direction: column;
        align-items: flex-end;

        h6{
            color:grey;
        }
        }
        }
    }
    }
}

`;

export default SubscriptionPage