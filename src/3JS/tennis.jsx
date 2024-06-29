import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas } from "@react-three/fiber";
import { TennisModel } from './Tennisgame.jsx';
import Navbar from "../LandingPage/navbar/Navbar.js";
import { Navigate, useNavigate } from 'react-router-dom';
import { url } from '../config.js';
import axios from 'axios';
export default function Tennis({ user }) {
    const navigate=useNavigate();
    const [result, setResult] = useState(null);
    const [showAnimation, setShowAnimation] = useState(false);
    const [rerenderKey, setRerenderKey] = useState(0); // Key for re-rendering
    const [contextLost, setContextLost] = useState(false); // Track context status
    const canvasRef = useRef(null);
    const [restart,setRestart]=useState(false)
    const gameId="7340EE1C-2F18-4EA7-226F-08DC97CB9193";
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ input: 'Left' })  // Sending input as 'Left'
            });
            const data = await response.json();
            setResult(data.result);
            console.log(data.result);
          
        } catch (error) {
            console.error('Error:', error);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAnimation(true);
            fetchData();
        }, 5000);

        return () => clearTimeout(timer);
    }, [rerenderKey, fetchData]);

    useEffect(() => {
        const canvas = canvasRef.current;

        const handleContextLost = (event) => {
            event.preventDefault();
            console.warn('WebGL context lost');
            // fetchData()
            setContextLost(true); // Update state to indicate context is lost
        };

        const handleContextRestored = () => {
            console.log('WebGL context restored');
            setContextLost(false); // Update state to indicate context is restored
            setRerenderKey(prevKey => prevKey + 1); // Re-render to reload assets
        };

        if (canvas) {
            canvas.addEventListener('webglcontextlost', handleContextLost, false);
            canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
        }

        return () => {
            if (canvas) {
                canvas.removeEventListener('webglcontextlost', handleContextLost);
                canvas.removeEventListener('webglcontextrestored', handleContextRestored);
            }
        };
    }, []);

    const handleRerender = () => {
        // setShowAnimation(false);
        // setRerenderKey(prevKey => prevKey + 1); // Increment the key to trigger re-render
        // setShowAnimation(true);
      
        window.location.reload(); // Reload the entire page
    };
    const handleQuit = () => {
//         console.log('patient',user['id']+ localStorage.getItem('score'))
//         let posturl = url + 'AddGame';
//         let data = {
         
//          patientId: user['id'].toString(),
//           gameTypeId: gameId,
//         score: localStorage.getItem('score').toString(),
//         duration: "string",
//   accuracy: "string",
//   date: "2024-06-29T02:19:08.566Z",
//        };
        
//        axios.post(posturl, data).then(response => {
//         console.log(response)
//              navigate('/dashboard');

//          }).catch(error => {
//           console.log(error)
//        });

navigate('/dashboard');
};
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* <button onClick={handleRerender} style={{ position: 'absolute', top: 0 }}>Re-render Tennis Model</button>
             */}
            <div style={{ flexGrow: 1, position: 'relative', backgroundColor: 'white', zIndex: 1 }}>
                <Canvas ref={canvasRef} style={{ height: '100%' }} key={rerenderKey}>
                    <directionalLight intensity={5} />
                    {showAnimation  && <TennisModel data={result} isplayed={false}  />}
                </Canvas>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                <button onClick={handleRerender} style={{ marginRight: '10px' , color:'white'  }}>Reload</button>
                <button style={{ color:'white' }} onClick={handleQuit}>Quit</button>
            </div>
        </div>
    );
}
