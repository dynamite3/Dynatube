import React, { useState, useEffect } from 'react'
import styled from "styled-components";

import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import ReplyIcon from '@mui/icons-material/Reply';

import { apiendpoint } from '../UploadVideoPage';
import {

    Switch,
    Route,
    useParams,
    useHistory
} from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import moment from "moment"

import random_bg_color from './randomColor'
import { flexbox } from '@mui/system';


function CommentSection() {

    const [comment, setComment] = useState("")
    const [commentList, setCommentList] = useState([])

    const { videoId } = useParams();
    const postId = videoId

    function handleChange(e) {
        setComment(e.currentTarget.value)
    }


    function getAllComments() {
        fetch(apiendpoint + "/comment/getAllComments",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
                body: JSON.stringify({
                    videoId
                }
                ),
            })
            .then((data) => data.json())
            .then((d) => {
                setCommentList(d)

            })

    }

    function onSubmitComment() {

        const cur_user = JSON.parse(localStorage.getItem('current-user'))
        const commentFrom = cur_user._id

        const variable = {
            content: comment,
            writer: commentFrom,
            postId: postId
        }

        fetch(apiendpoint + "/comment/uploadComment",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
                body: JSON.stringify(
                    variable
                ),
            })
            .then((data) => data.json())
            .then((d) => {
                setComment("");
                getAllComments();
            })

    }

    useEffect(() => {
        getAllComments()
    }, [videoId])


    return (
        <CommentSectionStyled>
            <p>Comments ({commentList.length}) :</p>

            <div className="comments_till_now">
                {

                    commentList.map((e) => (

                        !e.responseTo ?
                            <>
                                <SingleComment e={e} getAllComments={getAllComments} />
                                <ReplyComment e={e} getAllComments={getAllComments} commentList={commentList} />
                            </>
                            :
                            ""
                    )
                    )
                }
            </div>
            <form
                className="fromdiv"
                autocomplete="off"
            >
                <TextField
                    id="standard-basic"
                    label="Comment"
                    variant="standard"
                    className="textfeild"
                    value={comment}
                    onChange={handleChange}
                    autocomplete="off"
                />
                <Button variant="outlined"
                    onClick={() => onSubmitComment()}
                >Submit</Button>

            </form>

        </CommentSectionStyled>
    )
}

function SingleComment({ e, getAllComments }) {
    const { videoId } = useParams();
    const [commentVal, setCommentVal] = useState("")
    const [openReplyForm, setOpenReplyForm] = useState(false)

    function sendReplyCom(e) {


        const cur_user = JSON.parse(localStorage.getItem('current-user'))
        const commentFrom = cur_user._id

        const variable = {
            content: commentVal,
            writer: commentFrom,
            postId: videoId,
            responseTo: e._id
        }

        fetch(apiendpoint + "/comment/uploadComment",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
                body: JSON.stringify(
                    variable
                ),
            })
            .then((data) => data.json())
            .then((d) => {
                console.log(d);
                setCommentVal("");
                getAllComments();
                setOpenReplyForm(!openReplyForm)
            })


    }

    function handleChange(e) {
        setCommentVal(e.currentTarget.value)
    }


    return (
        <>
            <div className="commentItem">
                <Avatar
                    style={{ background: random_bg_color() }}
                >
                    {e.writer.FirstName[0] + e.writer.LastName[0]}
                </Avatar>
                <div>
                    <div style={{ color: "grey" }}>{e.writer.FirstName + " " + e.writer.LastName}</div>
                    <div>{e.content}</div>
                </div>
                <div style={{ marginLeft: "auto" }}>
                <ReplyIcon
                    onClick={() => setOpenReplyForm(!openReplyForm)}
                />
            </div>
            </div>
            


            {
                openReplyForm ?
                    <div style={{ marginLeft: "100px", marginTop: "1rem" ,display:"flex"}}>
                        <TextField
                            id="standard-basic"
                            label="Subcomment "
                            variant="standard"
                            className="textfeild"
                            value={commentVal}
                            onChange={handleChange}
                            autocomplete="off"
                            style={{width:"-webkit-fill-available"}}
                        />
                        <Button variant="outlined"
                            onClick={() => sendReplyCom(e)}
                        >Reply</Button>
                    </div>
                    :
                    ""
            }

        </>
    )
}


function ReplyComment({ e, getAllComments, commentList }) {
    // const [showReplies,setShowReplies]=useState(false)
    const [showReplies,setShowReplies]=useState(false)
    return (
        <>
            {
            commentList.filter((com)=>com.responseTo==e._id).length > 0 ?
            <div style={{ marginLeft: "60px", marginTop:"5px",fontSize:"13px"}} onClick={()=>setShowReplies(!showReplies)}>Replies ({commentList.filter((com)=>com.responseTo==e._id).length})...</div>
            :
            ""
            }
            {
                // showReplies?
                showReplies?
                

                commentList.filter((com)=>com.responseTo==e._id).map((com) => ( 

                    <>
                    

                    <div className="commentItem">
                        <div style={{ marginLeft: "50px", width: "-webkit-fill-available" }}>

                            {/* <Avatar
                                style={{ background: random_bg_color() }}
                            >
                                {com.writer.FirstName[0] + com.writer.LastName[0]}
                            </Avatar>
                            <div>
                                <div style={{ color: "grey" }}>{com.writer.FirstName + " " + com.writer.LastName}</div>
                                <div>{com.content}</div>
                            </div>
                            <div style={{ marginLeft: "auto" }}>
                            
                            </div> */}
                            
                            <SingleComment e={com} getAllComments={getAllComments}/>
                            <ReplyComment e={com} getAllComments={getAllComments} commentList={commentList} />


                        </div>
                    </div>
                    </>
                ))
                :
                ""

            }


        </>

    )
}

const CommentSectionStyled = styled.div`

margin-top: 2rem;
margin-bottom: 2rem;
padding:1rem;
background: cornsilk;



.fromdiv{
    display:flex;
    margin-top:2rem;
    margin-bottom:1rem;
    align-items: center;
    .textfeild{
        width: -webkit-fill-available;
    }
    button{
    margin-left: auto;
    }
}

.commentItem{
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top:4px;
    // border-bottom:solid 1px black;
    padding:.5rem;
}


`

export default CommentSection
