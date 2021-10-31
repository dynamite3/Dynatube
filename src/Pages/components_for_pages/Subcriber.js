import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Button from '@mui/material/Button';
import { apiendpoint } from '../UploadVideoPage';






function Subcriber({subscribeTo,subscribeFrom}) {

    const [numberofsubscribers,setNumberofSubscribers]=useState([])
    const [amiSubscriber,setamISubscriber]=useState(false)
    // console.log('++++++++++from++++++++++')
    // console.log(subscribeTo)
    // console.log(subscribeFrom)
    // console.log('++++++++++from++++++++++')

    const data={
        subscribeTo:subscribeTo,
        subscribeFrom:subscribeFrom._id
    }

    function subscribe() {
        
        fetch(apiendpoint + "/subscribe/subscribeTo" ,
        {
            method: "POST",
            headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
            body: JSON.stringify(
                data
               ),
        })
        .then((data) => data.json())
        .then((d)=>{

            subscriberNumber()
            checkSubscriber()
        }
        )

    }
    function unsubscribe() {
        
        fetch(apiendpoint + "/subscribe/unsubscribeTo" ,
        {
            method: "POST",
            headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
            body: JSON.stringify(
                data
               ),
        })
        .then((da) => da.json())
        .then((d)=>{
            checkSubscriber()
            subscriberNumber()
        }
        )

    }

    function checkSubscriber(){
        fetch(apiendpoint + "/subscribe/checksubscribeTo-from" ,
        {
            method: "POST",
            headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
            body: JSON.stringify(
                data
               ),
        })
        .then((data) => data.json())
        .then((d)=>{

           if(d.length >0){
                setamISubscriber(true)
           }
           else{
                setamISubscriber(false)
           }
        }
        )
    }

    
    function subscriberNumber() {
        fetch(apiendpoint + "/subscribe/subscriberNumber" ,
        {
            method: "POST",
            headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
            body: JSON.stringify(
                data
               ),
        })
        .then((data) => data.json())
        .then((d)=> {
            setNumberofSubscribers(d)
            console.log(numberofsubscribers) 
        })
    }
    

    useEffect(()=>{
        subscriberNumber()
        checkSubscriber()
        console.log(amiSubscriber)
    },[subscribeTo,amiSubscriber])

    return (
        <SubscriberStyled>
            {
            // !amiSubsciber.length >0  ?
            <Button  variant={!amiSubscriber ?"contained":"outlined"} color= "error"
                onClick={()=>
                    // !amiSubscriber.length >0 ?
                    amiSubscriber?
                    unsubscribe() 
                    :
                    subscribe()
                    // :
                    // unsubscribe()
                }
            >
               {
                   amiSubscriber ? "UnSubscribe": "Subscribe"
               } 
            </Button>
            //:
            // ""
            }
            <h6>subscibers: {numberofsubscribers.length}</h6>
        </SubscriberStyled>
    )
}

const SubscriberStyled = styled.div`

display: flex;
align-items: center;
flex-direction: column;


`;

export default Subcriber
