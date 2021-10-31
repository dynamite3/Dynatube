import React, { useState, useEffect } from 'react'
import styled from "styled-components";

import { Row } from 'react-bootstrap';
import { Col } from "react-bootstrap";
import { apiendpoint } from './UploadVideoPage';
import { Avatar } from '@mui/material';
import moment from "moment"
import {

    Switch,
    Route,
    useParams,
    useHistory
} from "react-router-dom";

import Image from 'react-bootstrap/Image';
import random_bg_color from './components_for_pages/randomColor';

import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';



import Subcriber from './components_for_pages/Subcriber';

function UserChannel() {

    const cur_user=JSON.parse(localStorage.getItem('current-user'))
    const curr_user=cur_user._id

    let history = useHistory();

    const [currentUserChannel, setCurretUserChannel] = useState('')
    const [ChannelVideo,setChannelVideo]=useState([])
    const { userChannelId } = useParams();
    console.log(userChannelId)

    function GetcurrentChnannel() {



        fetch(apiendpoint + "/user/currentUser",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
                body: JSON.stringify(
                    {
                        userChannelId
                    }
                ),
            })
            .then((data) => data.json())
            .then((d) => {
                console.log(d)
                setCurretUserChannel(d)
            }
            )

    }

    function getallUserChannelvideos() {

        fetch(apiendpoint + "/video/ChannelVideo",
        {
            method: "POST",
            headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
            body: JSON.stringify({
                channelId:userChannelId
                }
               ),
        })
        .then((data) => data.json())
        .then((d)=>{
            console.log(d)
            setChannelVideo(d)
        })

    }

    useEffect(() => {
        GetcurrentChnannel()
        getallUserChannelvideos()
    }, [])


    if (currentUserChannel)
        return (
            <UserChannelPageStyled>
                <div className="row channelCard">
                    
                    <Avatar 
                    style={{background : random_bg_color()}}
                    className="avatarUser">{currentUserChannel.FirstName[0] +currentUserChannel.LastName[0] }</Avatar>
                    
                    <div className="col blockr">
                        <div>Name : {currentUserChannel.FirstName + " " + currentUserChannel.LastName} </div>
                        <div>Conatact : {currentUserChannel.EmailId} </div>
                    </div>
                    <div className="col ">
                    <Subcriber subscribeTo={currentUserChannel._id} subscribeFrom={JSON.parse(localStorage.getItem('current-user'))}/>
                    </div>
                </div>


                
            <div className="row expr1">
                <h1>This channel videos</h1>
            </div>

            <div className="row expr2">
                {

                        ChannelVideo.map((e) =>
                        // console.log(apiendpoint+"/"+e.thumbnail)
                        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 col-cards">
                            <div className="video-card" 
                            
                            >
                                <Image 
                                onClick={()=>history.push("/content/DetailVideo/"+e._id)}
                                className="disimg" src={ e.thumbnail} fluid style={{ height: "200px", width: "300px" }} />
                                <div className="card-des">


                                    <div>
                                        <h5>{e.title}</h5>
                                        <div className="bywhom">
                                            <div>
                                                <Avatar>{e.writer.FirstName[0]+e.writer.LastName[0]}</Avatar>
                                            </div>
                                            <b>{e.writer.FirstName + " " + e.writer.LastName}</b>
                                        </div>
                                        
                                        <div className="abtvideo">
                                            <h6>Views : 1.2k</h6>
                                            <h6>created at: {moment(e.createdAt).format("Do MMM YYYY")}</h6>
                                        </div>
                                        
                                    </div>
                                </div>
                                
                                <div className="footerdes">
                                    {e.writer._id==curr_user  ? <DeleteVideo id={e._id} getallUserChannelvideos={getallUserChannelvideos}/> : ""}
                                    <div className="duration">{e.duration}</div>
                                
                                </div>
                            </div>
                            
                        </div>

                    )}
            </div>



            </UserChannelPageStyled>
        )
    else
        return (
            <div>
                loading
            </div>
        )
}


function DeleteVideo({id,getallUserChannelvideos}){

    function delete_video(id){
        fetch(apiendpoint + "/video/deletevideo",
            {
                method: "DELETE",
                headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
                body: JSON.stringify(
                    {
                        idtodelete:id,
                    }
                ),
            })
            .then(()=>getallUserChannelvideos())
    }

    return(
        <Fab aria-label="add">
            <DeleteIcon onClick={()=>delete_video(id)}/>
        </Fab>
    )
}
const UserChannelPageStyled = styled.div`
.duration{
    background: cornsilk;
    margin-left: auto;
    display: flex;
    height: max-content;
    margin-top: auto;

}
.footerdes{
    display:flex;
    width: -webkit-fill-available;
}

margin-top:2rem;
padding:1rem;
.channelCard{
    background: aqua;
    
    gap: 1rem;
    padding: 1rem;
    min-height:10rem;
    display: flex;
    align-items: center;

}

.avatarUser{
    height: 6rem;
    width: 6rem;
    font-size: xxx-large;
}


.expr1{
    border-bottom:2px solid grey;
}

.expr2{
    margin-top:2rem;
    display: flex;
    justify-content: center;

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

export default UserChannel
