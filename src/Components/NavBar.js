import { style } from 'dom-helpers';
import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    NavLink
} from "react-router-dom";
import styled from "styled-components";

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'


import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';

import 'bootstrap/dist/css/bootstrap.min.css';

export function NavBar({sidebar,setsidebar,showsidebar}) {

    
    return (

        <NavBarStyled>


            <div className="container-fluid nc">
                <div className="row nr">

                    <div className="U-navbar">
                        <ul>
                            <li>
                                <Link to="/content/Home">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/content/Upload">
                                    Upload
                                </Link>
                            </li>
                            <li>
                                <Link to="/content/Explore">
                                    Explore
                                </Link>
                            </li>
                            <li>
                                <Link to="/content/Subscription">
                                    Subscription
                                </Link>
                            </li>
                            {/* <li>
                                <Link to="content">
                                    Content
                                </Link>
                            </li> */}
                        </ul>

                    </div>
                </div>
            </div>

            {/* <Link to="#" className="menu-bars" id="menubt">
                <MenuIcon onClick={showsidebar} />
            </Link> */}

            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showsidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <CancelIcon />
                        </Link>
                    </li>

                    <li className="nav-text">
                        <Link to="/content/Home">
                            Home
                        </Link>
                    </li>
                    <li className="nav-text">
                        <Link to="/content/Upload">
                            Upload
                        </Link>
                    </li>
                    <li className="nav-text">
                        <Link to="/content/Explore">
                            Explore
                        </Link>
                    </li>
                    <li className="nav-text">
                        <Link to="/content/Subscription">
                            Subscription
                        </Link>
                    </li>
                    {/* <li className="nav-text">
                        <Link to="content">
                            Content
                        </Link>
                    </li> */}
                </ul>
            </nav>
        </NavBarStyled>
    );
}


const NavBarStyled = styled.div`
font-size:1rem;
background: rgb(227,224,221);
background: linear-gradient(195deg, rgba(227,224,221,1) 0%, rgba(0,0,0,1) 100%);


margin: inherit;
.nc{
}

.menu-bars{
    float: right;
    // position: sticky;
    position: fixed;
    // position: absolute;
    margin-right: 12px;
    display:none;

    svg{
        font-size:2.5rem;
    }

}
  
.nr{
    display:flex;

}
.U-navbar{
    // background:rgba(191, 191, 191, .8);
    min-height:100vh;
    
    
    padding-top: 12px;
    ul{
        
    position: fixed;

      list-style: none;
      display: flex;
      align-items: center;
      margin-left:auto;
      flex-direction: row;
      gap: 1rem;
      font-size:1.2rem;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    li{
   
    }
    a{
      text-decoration: none;
      font-size: 1.2rem;
      color:black;
      &:hover{
        background:grey;
        padding:5px;
        border-radius:2px;
        color:white;
        }
        
      
    }
    

    
}

@media only screen and (max-width: 800px) {
    .nc{
        display:none;
    }
    .menu-bars{
        display:block;
    }
  }


.navbar{
    background-color: black;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }
  
  .nav-menu{

    z-index:1;
    height: 100%;
    background-color: rgb(255,127,80,0.9);
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top:0;
    left: -100%;
    transition: 850ms;
  }
  
  .nav-menu.active{
    left:0;
    transition: 350ms;
    width: 250px;
    height: 100%;
  }
  
  .nav-text{
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;
  }
  
  .nav-text a{
    text-decoration: none;
    color: #f5f5f5;
    font-size: 1rem;
    width: 95%;
    height:100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-radius: 5px;
  }
  
  .nav-text a:hover{
      background-color: rgba(6,11,38,0.9);
      color: white;
  
  }
  
  .nav-menu-items{
    width: 100%;
  }
  
  .navbar-toggle{
    
    width: 100%;
    height:80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }
  

  


    
`;

export default NavBar;