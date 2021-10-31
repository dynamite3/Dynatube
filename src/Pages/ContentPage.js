
import react, { useState } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';

import { Route, Switch } from "react-router";

import HomePage from "./HomePage";
import ExplorePage from "./ExplorePage";
import SubscriptionPage from "./SubscriptionPage";
import NavBar from "../Components/NavBar";
import DetailVideoPage from "./DetailVideoPage";
import UploadPage from "./UploadPage";

import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import UserChannel from "./UserChannel";
import YouTubeIcon from '@mui/icons-material/YouTube';



function ContentPage() {
    const [sidebar, setsidebar] = useState(false)
    
    const showsidebar = () => {
        setsidebar(!sidebar)
    }

    return (


        <ContentPageStyled>





            <div className="container-fluid">

                <div className="row r1">
                    
                    <Header sidebar={sidebar} setsidebar={setsidebar} showsidebar={showsidebar}/>
                </div>


                <div className="row r2">
                   
                       
                    <NavBar sidebar={sidebar} setsidebar={setsidebar} showsidebar={showsidebar}/>

                    <div className="content">
                    <Switch>
                        <Route path="/content" exact><HomePage /></Route>
                        <Route path="/content/Home" exact><HomePage /></Route>
                        <Route path="/content/Upload" exact><UploadPage /></Route>
                        <Route path="/content/Explore" exact><ExplorePage /></Route>
                        <Route path="/content/Subscription" exact><SubscriptionPage /></Route>
                        {/* <Route path="/content/Subscription" exact><SubscriptionPage /></Route> */}
                        <Route path="/content/DetailVideo/:videoId" exact ><DetailVideoPage/></Route>
                        <Route path="/content/UserChannel/:userChannelId" exact ><UserChannel/></Route>
                    </Switch>
                    </div>
        
            
                   
                </div>

            </div>



        </ContentPageStyled>

    )
}

const ContentPageStyled = styled.div`


.menu-bars{
    z-index: 1;
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

.r1{
    height:4rem;
    background: rgb(207,215,172);
    background: linear-gradient(270deg, rgba(207,215,172,1) 0%, rgba(215,10,10,1) 100%);
    
}

.r2{
    display: grid;
    grid-template-columns: 1fr 3fr;

}

.content{
    margin: initial;
}

@media only screen and (max-width: 920px) {
    .nc{
        display:none;
    }
    .menu-bars{
        display:block;
    }
    .r2{
        display: grid;
        grid-template-columns: 1fr;
    }
  }
`;

export default ContentPage


function Header({sidebar,setsidebar,showsidebar}) {
    var history = useHistory();


    return (
        <HeaderStyled>

            <Link to="#" className="menu-bars" id="menubt">
                    <MenuIcon onClick={showsidebar} />
                     </Link>
            <h3>
                <YouTubeIcon/>
                DynaTube
            </h3>

            <Button variant="contained" color="secondary" id="logoutBt"
                onClick={() => {
                    localStorage.removeItem("auth-token")
                    localStorage.removeItem("current-user")
                    history.push("/login")
                }
                }
            >
                Log Out
            </Button>


        </HeaderStyled>
    )

}

const HeaderStyled = styled.div`
    display:flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;

    h3{
        display: flex;
        align-items: center;
        margin:inherit;
        padding-left:1rem;
        svg{
            font-size:3rem;
        }
    }
    @media only screen and (max-width: 920px) {
        h3{
            padding-left:3rem;
        }
    }

    button{
        background: crimson;
    }
`;