import React from 'react'
import axios from 'axios';

export default function Connecting()
{
    function connecttodata()
    {
        axios.get('https://localhost:7291/GetAllAttributes')
        .then(function (response)
        {
            console.log(response.data)
        })
    }
    return(
        <button style={{backgroundColor:"red"}} onClick={()=>connecttodata()}>
            Click me 
        </button>
    )
}