import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import axios from 'axios';
import * as THREE from 'three';

export function TennisModel({props, data,user,isplayed}) {
    const group = useRef();
    const [command, setCommand] = useState('');
    const [hasplayed, setHasplayed] = useState(isplayed);
    const { nodes, materials, animations } = useGLTF('/Tennis.glb');
    const { actions } = useAnimations(animations, group);


    

    useEffect(() => {
      if (actions) {
        Object.values(actions).forEach(action => action.stop && action.stop());
        
    }

        if (data === 'Left') {
            actions.OpponentRacketLeftServe.reset().play().setLoop(THREE.LoopOnce, 1).clampWhenFinished = true;
            actions.TennisBallLeftServe.reset().play().setLoop(THREE.LoopOnce, 1).clampWhenFinished = true;
        } else if (data === 'Right') {
            actions.OpponentRacketRightServe.reset().play().setLoop(THREE.LoopOnce, 1).clampWhenFinished = true;
            actions.TennisBallRightServe.reset().play().setLoop(THREE.LoopOnce, 1).clampWhenFinished = true;
            actions.PlayerRacketMoveRight.reset().play().setLoop(THREE.LoopOnce, 1).clampWhenFinished = true;
        }
    }, [data]);

    useEffect(() => {
        if (!hasplayed) {
            if (data === 'Left' && command === 'Left') {
                actions.PlayerRacketPlayLeft.reset().play().setLoop(THREE.LoopOnce, 1).clampWhenFinished = true;
                actions.GoingRightToOpponent.reset().play().setLoop(THREE.LoopOnce, 1).clampWhenFinished = true;
                setHasplayed(true);
                axios.post("http://127.0.0.1:5000/Left")
                    .then(response => {
                        console.log(response.data);
                        
                        let currentScore = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;

                        // Add 10 to the current score
                        let newScore = currentScore + 10;

                        // Store the updated score back in localStorage
                        localStorage.setItem('score', newScore);
                    })
                    .catch(error => {
                        console.error("Error connecting:", error);
                    });
            } else if (data === 'Left' && command !== 'Left') {
                actions.LeftFail.reset().play().setLoop(THREE.LoopOnce, 1).clampWhenFinished = true;
                setHasplayed(true);
                let currentScore = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
                localStorage.setItem('score', currentScore);
            } else if (data === 'Right' && command === 'Right') {
                actions.PlayerRacketPlayRight.reset().play().setLoop(THREE.LoopOnce, 1).clampWhenFinished = true;
                actions.GoingLeftToOpponent.reset().play().setLoop(THREE.LoopOnce, 1).clampWhenFinished = true;
                setHasplayed(true);
                axios.post("http://127.0.0.1:5000/Right")
                    .then(response => {
                        console.log(response.data);

                          
                        let currentScore = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;

                        // Add 10 to the current score
                        let newScore = currentScore + 10;

                        // Store the updated score back in localStorage
                        localStorage.setItem('score', newScore);
                    })
                    .catch(error => {
                        console.error("Error connecting:", error);
                        
                    });
            } else if (data === 'Right' && command !== 'Right') {
                actions.RightFail.reset().play().setLoop(THREE.LoopOnce, 1).clampWhenFinished = true;
                setHasplayed(true);
                let currentScore = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
                localStorage.setItem('score', currentScore);
            }
        }
    }, [command]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            let payload = {};
            if (event.key === 'ArrowLeft') {
                payload = {
                    data: [-0.81176737, 0.9683623, -0.59654038, 0.06800857, -0.15964, 0.03115891, 0.23036655, 0.43783579]
                };
                axios.post("http://127.0.0.1:5000/predict", payload).then(function (response) {
                    setCommand(response.data.prediction);
                });
            } else if (event.key === 'ArrowRight') {
                payload = {
                    data: [0.58038067, -0.74315105, 0.96168271, -0.69972196, -0.09325058, 0.54750461, 0.39829045, 0.63713962]
                };
                axios.post("http://127.0.0.1:5000/predict", payload).then(function (response) {
                    setCommand(response.data.prediction);
                });
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        setHasplayed(false)
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [])
  return (
    
         <group ref={group} {...props} dispose={null} scale={[5,5,1]} position={[0,-1,0]}>
       
      <group name="Scene">
        <mesh name="Ground" geometry={nodes.Ground.geometry} material={materials['Material.001']} position={[0.015, -0.086, 0.071]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-1, -2.835, -1.618]} />
        <mesh name="Net" geometry={nodes.Net.geometry} material={nodes.Net.material} position={[0.003, 0.189, 0.042]} rotation={[1.541, -0.005, -3.138]} scale={[0.898, 1.316, 0.188]} />
        {/* <mesh name="Pole" geometry={nodes.Pole.geometry} material={nodes.Pole.material} position={[0, -0.002, 0]} /> */}
        <mesh name="Pole2" geometry={nodes.Pole2.geometry} material={nodes.Pole2.material} position={[0.006, 0.034, 0.134]} rotation={[-Math.PI, 0, 0]} scale={[-0.059, -0.03, -0.049]} />
        <group name="TannisBall" position={[-0.125, 0.284, -1.143]} rotation={[Math.PI / 2, 0, Math.PI]} scale={0.028}>
          <mesh name="Sphere004" geometry={nodes.Sphere004.geometry} material={materials.withoutTheLine} />
          <mesh name="Sphere004_1" geometry={nodes.Sphere004_1.geometry} material={materials.line} />
        </group>
        <group name="OpponentRacket" position={[-0.099, 0.399, -1.249]} rotation={[2.992, 0.1, -2.97]} scale={[0.01, 0.068, 0.007]}>
          <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.base} />
          <mesh name="Cube001_1" geometry={nodes.Cube001_1.geometry} material={materials.curve} />
          <mesh name="Cube001_2" geometry={nodes.Cube001_2.geometry} material={materials.holder} />
          <mesh name="Cube001_3" geometry={nodes.Cube001_3.geometry} material={materials['vertical wires']} />
          <mesh name="Cube001_4" geometry={nodes.Cube001_4.geometry} material={materials['horizontal wires']} />
        </group>
        <group name="PlayerRacket" position={[-0.347, 0.418, 1.489]} rotation={[-0.093, -0.048, -1.85]} scale={[0.01, 0.068, 0.007]}>
          <mesh name="Cube003" geometry={nodes.Cube003.geometry} material={materials['horizontal wires.001']} />
          <mesh name="Cube003_1" geometry={nodes.Cube003_1.geometry} material={materials['vertical wires.001']} />
          <mesh name="Cube003_2" geometry={nodes.Cube003_2.geometry} material={materials['holder.001']} />
          <mesh name="Cube003_3" geometry={nodes.Cube003_3.geometry} material={materials['curve.001']} />
          <mesh name="Cube003_4" geometry={nodes.Cube003_4.geometry} material={materials['base.001']} />
        </group>
      </group>
    </group>
    
 
   )
}

useGLTF.preload('/Tennis.glb')
