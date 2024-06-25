import React, { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { TennisModel } from './Tennisgame.jsx';
import Navbar from "../LandingPage/navbar/Navbar.js";

export default function Tennis({ Patient }) {
    const [result, setResult] = useState(null);
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
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
        };

        const timer = setTimeout(() => {
            setShowAnimation(true);
            fetchData();
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            
                {/* <Navbar isLoggedIn={true} user={Patient} /> */}
                {/* <p>hello world</p> */}
            {/* </div> */}
            <div style={{ flexGrow: 1, position: 'relative', backgroundColor: 'white', zIndex: 1 }}>
                <Canvas style={{ height: '100%' }}>
                    <directionalLight intensity={5} />
                    {showAnimation && <TennisModel data={result} />}
                </Canvas>
            </div>
        </div>
    );
}
