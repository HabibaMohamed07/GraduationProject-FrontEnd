import React, { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { CourtDefault } from './TennisCourt.jsx';
import Tennismodel from './OpponentLeftServe.jsx';
import { TennisModel } from './Tennisgame.jsx';

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
        <Canvas  style={{position:'relative',backgroundColor:'white',height:'100vh' ,zIndex:'1'}}>
            <directionalLight intensity={5} />
           <TennisModel data={result}/>
        </Canvas>
         );
}
