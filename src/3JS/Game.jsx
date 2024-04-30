import React, { useRef,useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import Tennismodel from './OpponentLeftServe.jsx';
import NewGrassModel from './NewGrass.jsx';
import Model from './Kick.js'
import  {SortingObjectModel}  from "./SortingObjectModel.jsx";
import  {RatModel}  from "./Rat.jsx";
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
  const [SortingObject, setSortingObject] = React.useState('potato');
  // if(selectedGame === "Sorting"){
  //  setSortingObject(APICALLFUNCTION)
    
  
  
  // }



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
{ console.log(SortingObject);
  return (
    <Canvas className="position">
      <directionalLight intensity={3} />
      <NewGrassModel />
      <SortingObjectModel sortingobject={SortingObject} />
    </Canvas>
  );
}

else if (selectedGame==='Rat')
{ console.log(SortingObject);
  return (
    <Canvas className="position">
      <rectAreaLight intensity={3} />
      <RatModel />
      {/* <Rat sortingobject={SortingObject} /> */}
    </Canvas>
  );
}
}

