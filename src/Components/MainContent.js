
import react, { useState } from "react";
import { Route,Switch } from "react-router";
import styled from "styled-components";

import NavBar from "./NavBar";

import LoginPage from "../Pages/LoginPage";
import ContentPage from "../Pages/ContentPage";
import { PrivateRoute } from "./PrivateRoute";


import 'bootstrap/dist/css/bootstrap.min.css';

export const apiendpoint="https://dynatube3.herokuapp.com"
// export const apiendpoint="http://localhost:5454"

function MainContent(){
    return(
        <MainContentStyled>
        

            <div className="main">
                <Switch>
                    <Route path="/" exact><LoginPage/></Route>
                    <Route path="/login" exact><LoginPage/></Route>
                    <PrivateRoute path="/content"><ContentPage/></PrivateRoute>
                </Switch>
            </div>

            
        </MainContentStyled>


    
    )
  }
  
  const MainContentStyled=styled.div`
  
  `;
  
  export default MainContent;



  
  