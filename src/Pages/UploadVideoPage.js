import React, { useState ,useContext} from 'react';
import styled from "styled-components";

import Dropzone from 'react-dropzone';
import Button from '@mui/material/Button';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TextField } from '@mui/material';
import Image from 'react-bootstrap/Image'

import axios from "axios";

import { AppContext } from '../App';

import {

    Switch,
    Route,
    useParams,
    useHistory
} from "react-router-dom";




export const apiendpoint="https://dynatube3.herokuapp.com"
// export const apiendpoint = "http://localhost:5454"
// export const apiendpoint="http://localhost:5454"


const Private = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
]

const Catogory = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
    { value: 0, label: "Kids" }
]





function UploadVideoPage() {

    const myContext = useContext(AppContext);
    
    let history = useHistory();



    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState(0);
    const [categories, setCategories] = useState("Film & Animation");
    const [thumbnail,setThumbnail]=useState("");
    const [thumbnailfilePath,setThumbnailfilePath]=useState("");
    const [filePath,setFilePath]=useState("");
    const[videoDuration,setVideoDuration]=useState("");

    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value)
        console.log(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {
        console.log(event.currentTarget.value)

        setDescription(event.currentTarget.value)
    }

    const handleChangeOne = (event) => {
        setPrivacy(event.currentTarget.value)
        console.log(privacy)
    }

    const handleChangeTwo = (event) => {
        setCategories(event.currentTarget.value)
        console.log(categories)
    }

    function  onSubmit() {
        var dur=Math.round(+videoDuration)
        
        var tmp=Math.floor(dur/60)+"."+dur%60+"min"
       
        const variables={
            // writer: localStorage.getItem("current-user") ,
            writer:JSON.parse(localStorage.getItem('current-user')),
            // writer:myContext.currentUser,
            title:title ,
            description:description ,
            privacy: privacy,
            catogory:categories,
            thumbnail:thumbnailfilePath,
            filePath:filePath,
            duration:tmp,
            createdAt: Date()
        }
        console.log(variables)

        fetch(apiendpoint+"/video/uploadVideo",
        {
            method: "POST",
            headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
            body: JSON.stringify(
                variables
               ),
        })
        .then((data) => data.json())
        .then(()=>history.push("/content"))
        
    }

    const onDrop=(files)=>{
        let formData = new FormData();
       
        console.log(files)
        formData.append("file",files[0])
        formData.append("upload_preset","dynatubeuploader")
        formData.append("cloud_name","dynatube")

       fetch("https://api.cloudinary.com/v1_1/dynatube/upload",{
           method:"POST",
           body:formData
       })
       .then(res=>res.json())
       .then(d=>{
           console.log(d)
           setFilePath(d.url)
           setVideoDuration(d.duration)

       })
       .catch(e=>console.log(e))

       
        // addvideo(formData)
        
    }

    
    const onDrop1=(files)=>{
        let formData = new FormData();
        console.log(files)
        formData.append("file",files[0])
        formData.append("upload_preset","dynatubeuploader")
        formData.append("cloud_name","dynatube")

       fetch("https://api.cloudinary.com/v1_1/dynatube/upload",{
           method:"POST",
           body:formData
       })
       .then(res=>res.json())
       .then(d=>{
           console.log(d)
           setThumbnailfilePath(d.url)
       })
       .catch(e=>console.log(e))

        
    }

    return (
        <UploadVideoPageStyled>
            {/* <div className="container-fluid">  */}
            <form>
                <div className="formdiv">

                    <div className="row upr1">

                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            Video
                        <Dropzone
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={800000000}>
                            {({ getRootProps, getInputProps }) => (
                                <div style={{ width: '200px', height: '140px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <AddCircleOutlineIcon />

                                </div>
                            )}
                        </Dropzone>
                        </div>
                       
                    </div>
    
                    <div className="row upr2">

                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">  
                        Thumbnail
                        <Dropzone
                            onDrop={onDrop1}
                            multiple={false}
                            maxSize={800000000}>
                            {({ getRootProps, getInputProps }) => (
                                <div style={{ width: '200px', height: '140px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <AddCircleOutlineIcon />

                                </div>
                            )}
                        </Dropzone>
                        
                        </div>

                        {
                        thumbnailfilePath ?
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <img  
                                style={{ width: '200px', height: '150px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                src={thumbnailfilePath} className="loginImage" />

                        </div>
                        :
                        ""
                        }
                    </div>

                    

                    <div className="dataform">
                        <TextField
                            id="filled-basic"
                            label="Title"
                            variant="filled"
                        
                            onChange={handleChangeTitle}
                            value={title}
                        />

                        <TextField
                            id="filled-basic"
                            label="Description"
                            variant="filled"
                            multiline
                            rows={4}
                            
                            onChange={handleChangeDecsription}
                            value={description}
                        />

                        <select onChange={handleChangeOne}>
                            {Private.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))}
                        </select>

                        <select onChange={handleChangeTwo}>
                            {Catogory.map((item, index) => (
                                <option key={index} value={item.label}>{item.label}</option>
                            ))}
                        </select>

                        <Button variant="outlined"
                        onClick={onSubmit}
                        >Submit</Button>


                    </div>
                </div>
            </form>
            {/* </div> */}
        </UploadVideoPageStyled>


    )
}

const UploadVideoPageStyled = styled.div`

.formdiv{
    
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
    gap:1rem;

}
.dataform{
    display: flex;
    flex-direction: column;
    gap:1rem;
}
.upr2{
    display: flex;
    align-items: flex-end;
}
`;

export default UploadVideoPage
