
import react, { useState } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';

import NavBar from "../Components/NavBar";
import UploadVideoPage from "./UploadVideoPage";



function UploadPage() {
    


    return (

        <UploadPageStyled>
              <UploadVideoPage/>
        </UploadPageStyled>

    )
}

const UploadPageStyled = styled.div`


`;

export default UploadPage