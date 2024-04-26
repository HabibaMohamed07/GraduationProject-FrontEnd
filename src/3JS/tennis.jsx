import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import Tennismodel from './OpponentLeftServe.jsx';
import NewGrassModel from './NewGrass.jsx';
import Model from './Kick.js'
import '../3JS/game.css';
const Scene = () => {
  const scene = useRef();
  useFrame(() => {
    scene.current.rotation.y += 0.04;
    scene.current.rotation.x += 0.04;
    scene.current.rotation.z += 0.04;
  });
  return (
    <group ref={scene}>
      <Box>
        <meshLambertMaterial color="white" />
      </Box>
    </group>
  );
};

export default function Game({selectedGame}) {
  console.log("The user has selected: ",selectedGame )
  if(selectedGame==='Tennis'){
  return (
    <Canvas className="position">
      <directionalLight intensity={1} />
      <Tennismodel brainsignal={"Left"} />
    </Canvas>
  );
}
else if (selectedGame==='Sorting')
{
  return (
    <Canvas className="position">
      <directionalLight intensity={0.5} />
      <NewGrassModel />
    </Canvas>
  );
}
}
