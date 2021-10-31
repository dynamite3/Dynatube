import react, { useState ,useEffect} from "react";
import styled from "styled-components";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { apiendpoint } from "../UploadVideoPage";

import {

    useParams,
    useHistory
} from "react-router-dom";

// const apiendpoint="http://localhost:5454"
// const apiendpoint="https://dynatube.herokuapp.com"


function LikeDislike() {

    const { videoId } = useParams();
    console.log(videoId);

    const [Likedby,setLikedby]=useState([])
    

    const [likedalready,setlikealredy]=useState(false)


    function getLikes(){
        fetch(apiendpoint + "/likedislike/getstat",
        {
            method: "POST",
            headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
            body: JSON.stringify({
                videoId:videoId
                }
               ),
        })
        .then((data) => data.json())
        .then((d)=>{
            setLikedby(d)
            checkIliked(d)
        })
    
    }

    console.log("liked:"+likedalready)
    function checkIliked(d){
        const cur_user=JSON.parse(localStorage.getItem('current-user'))
        const likeFrom=cur_user._id
        const mylike=d.filter((e)=>e.actionby==likeFrom)
        console.log(mylike)
        if(mylike.length>0){
            setlikealredy(true)
        }
        else {
            setlikealredy(false)
        }

        
    }

    function likeaction(){
        const cur_user=JSON.parse(localStorage.getItem('current-user'))
        const likeFrom=cur_user._id

        fetch(apiendpoint + "/likedislike/likeaction",
        {
            method: "POST",
            headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
            body: JSON.stringify({
                videoId:videoId,
                actionby:likeFrom,
                }
               ),
        })
        .then((data) => data.json())
        .then((d)=>
            getLikes()
        )
    }
    function unlikeaction(){
        const cur_user=JSON.parse(localStorage.getItem('current-user'))
        const likeFrom=cur_user._id

        fetch(apiendpoint + "/likedislike/unlikeaction",
        {
            method: "POST",
            headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
            body: JSON.stringify({
                videoId:videoId,
                actionby:likeFrom,
                }
               ),
        })
        .then((data) => data.json()) 
        .then((d)=>
            getLikes()
        )
    }


    useEffect(() => {
        getLikes()
    }, [videoId])


    return (
        <LikeDislikeStyled>
            <Fab aria-label="add" className="likeBt">
                <Badge badgeContent={Likedby.length} showZero color="primary"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >

                    <FavoriteIcon onClick={()=>
                        !likedalready?
                        likeaction()
                        :
                        unlikeaction()
                    }
                    style={{color : likedalready ? "red" : "grey"}}
                    />

                </Badge>
            </Fab>

    


        </LikeDislikeStyled>
    )
}

const LikeDislikeStyled = styled.div`
display: flex;
justify-content: flex-end;

svg{
    font-size:2rem;
}
`

export default LikeDislike
