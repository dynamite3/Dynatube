import react ,{useState} from "react";
import styled from "styled-components";

import { LogIn } from "../Components/LogIn";
import { SignUp } from "../Components/SignUp";
import { ForgotPass} from "../Components/ForgotPass"

import 'bootstrap/dist/css/bootstrap.min.css';

import Image from 'react-bootstrap/Image'
import { Container } from "react-bootstrap";



function LoginPage() {

    const [loginORsignupflag, setloginORsignupflag] = useState(0)

    return (
        <LoginPageStyled>


      <Container className="mainDiv">
        <div className="row">
          <div className="col-md-7 col-sm-12 col-lg-7 c1" id='c1'>
            <Image className="disimg" src="https://cdn.dribbble.com/users/452635/screenshots/2809164/illu_sign_up.png" fluid className="loginImage" />
          </div>
          <div className="col-md-5 col-sm-12 col-lg-5 c2" id='c2'>
            {
              loginORsignupflag === 0 ?

                <LogIn loginORsignupflag={loginORsignupflag} setloginORsignupflag={setloginORsignupflag} />
                :
                loginORsignupflag === 1 ?
                  <SignUp loginORsignupflag={loginORsignupflag} setloginORsignupflag={setloginORsignupflag} />
                  :
                  <ForgotPass loginORsignupflag={loginORsignupflag} setloginORsignupflag={setloginORsignupflag} />
            }
          </div>
        </div>
      </Container>
    


        </LoginPageStyled>
    )
}

const LoginPageStyled = styled.div`
    
.mainDiv{
    margin:1rem;
  }
  
  .r1{
    height: 800px;
  }
  
  .loginImage{
    object-fit: fill;
  }
  
  #from{
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }
  
  .sh{
    font-size: 60px;
    font-family: fantasy;
    letter-spacing: 6px;
  }
  
  .buttondiv{
    display: flex;
    justify-content: space-evenly;
    align-content: space-around;
    margin-top: 1rem;
  }
  
  .disimg{
  
  }
  #c1{
    margin: auto 0;
  }
  
  #passblock{
    display: flex;
      justify-content: flex-start;
      align-items: center;
  }
  #sbt{
    cursor: pointer;
    margin-top: 17px;
  }
  .pblock
  {
    min-width: 100%
  }
  
  #but_text{
    color: blue;
    cursor: pointer;
  }
  #resultMessage >h1{
    background-color: red;
    font-size: larger;
    font-weight: 600;
    margin: 2rem;
    font-size: xx-large;
    font-family: 'Times New Roman', Times, serif;
    font-weight: 600;
  }

    
`;

export default LoginPage;

