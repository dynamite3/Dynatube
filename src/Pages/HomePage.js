
import react, { useEffect, useState } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';

import NavBar from "../Components/NavBar";
import UploadVideoPage from "./UploadVideoPage";


function HomePage() {
    
    let history = useHistory();

    useEffect(()=>{
        const cur_user=JSON.parse(localStorage.getItem('current-user'))
        history.push("/content/UserChannel/"+cur_user._id)
    },[])
    return (

         
        <HomePageStyled>
             
        </HomePageStyled>

    )
}

const HomePageStyled = styled.div`


`;

export default HomePage