/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 OpponentLeftServe.glb 
*/

import React, { useRef,useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three';

export default function Tennismodel({props,brainsignal}) {
  console.log('brainsignal: ',brainsignal)
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/LeftServe.glb')
  const { actions,mixer  } = useAnimations(animations, group)
  useEffect(() => {
    console.log('actions', actions);
    if (brainsignal === 'Left') {
      console.log("The user has to do a Left Motion");
      actions.sidehit.reset().play().setLoop(THREE.LoopOnce, 1).clampWhenFinished = true;
      actions.ballaction.reset().play().setLoop(THREE.LoopOnce, 1).clampWhenFinished = true;
    } else {
      console.log("The game hasn't started yet");
    }
  }, [brainsignal, actions]);

  return (
    
    <group ref={group} {...props} dispose={null} scale={[1.5,1.5,1.5]} position={[0,-1,0]}>
      <group name="Scene">
        <group name="Empty" position={[-0.509, 0.158, 1.487]} rotation={[2.975, -0.111, 2.038]} scale={[0.33, 0.141, 0.328]}>
          <mesh name="Circle001" geometry={nodes.Circle001.geometry} material={materials.base} position={[-0.632, 1.172, -0.831]} rotation={[-1.259, -1.538, 0.308]} scale={[7.084, 3.049, 3.03]} />
          <mesh name="Cube" geometry={nodes.Cube.geometry} material={materials.curve} position={[-0.670, -0.278, -0.815]} rotation={[0, 0, -Math.PI]} scale={[0.022, 0.068, 0.577]} />
          <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={nodes.Cube001.material} position={[-0.670, -0.799, -0.815]} rotation={[0, 0, -Math.PI]} scale={[0.031, 0.479, 0.02]} />
          <mesh name="Cube002" geometry={nodes.Cube002.geometry} material={nodes.Cube002.material} position={[-0.672, -0.799, -0.815]} rotation={[0, 0, -Math.PI]} scale={[0.031, 0.479, 0.02]} />
          <mesh name="Plane003" geometry={nodes.Plane003.geometry} material={materials.holder} position={[-0.634, 4.471, -1.119]} rotation={[-Math.PI, 0, 0]} scale={[-0.168, -7.085, -0.169]} />
          <mesh name="Plane005" geometry={nodes.Plane005.geometry} material={materials['vertical wires']} position={[-0.638, 1.17, -0.816]} rotation={[Math.PI / 2, 0, 0]} scale={[-0.292, -0.589, -0.901]} />
          <mesh name="Plane006" geometry={nodes.Plane006.geometry} material={materials['horizontal wires']} position={[-0.606, 1.173, -0.817]} rotation={[Math.PI / 2, 0, 0]} scale={[-0.292, -0.589, -0.901]} />
        </group>
        <group name="Empty001" position={[0.263, 0.506, -1.054]} rotation={[2.989, 0.007, 2.601]} scale={[0.243, 0.367, 0.542]}>
          <mesh name="Circle002" geometry={nodes.Circle002.geometry} material={materials['base.001']} position={[1.161, 1.468, 0.483]} rotation={[-1.841, -1.546, -0.251]} scale={[2.728, 1.844, 4.107]} />
          <mesh name="Cube003" geometry={nodes.Cube003.geometry} material={nodes.Cube003.material} position={[1.162, 0.709, 0.492]} rotation={[0, 0, -Math.PI]} scale={[0.042, 0.184, 0.012]} />
          <mesh name="Cube004" geometry={nodes.Cube004.geometry} material={nodes.Cube004.material} position={[1.162, 0.709, 0.492]} rotation={[0, 0, -Math.PI]} scale={[0.042, 0.184, 0.012]} />
          <mesh name="Cube005" geometry={nodes.Cube005.geometry} material={materials['curve.001']} position={[1.158, 0.909, 0.492]} rotation={[0, 0, -Math.PI]} scale={[0.031, 0.026, 0.349]} />
          <mesh name="Plane007" geometry={nodes.Plane007.geometry} material={materials['horizontal wires.001']} position={[1.198, 1.468, 0.492]} rotation={[Math.PI / 2, 0, 0]} scale={[-0.397, -0.356, -0.347]} />
          <mesh name="Plane008" geometry={nodes.Plane008.geometry} material={materials['vertical wires.001']} position={[1.153, 1.467, 0.492]} rotation={[Math.PI / 2, 0, 0]} scale={[-0.397, -0.356, -0.347]} />
          <mesh name="Plane009" geometry={nodes.Plane009.geometry} material={materials['holder.001']} position={[1.159, 2.737, 0.309]} rotation={[-Math.PI, 0, 0]} scale={[-0.228, -2.727, -0.102]} />
        </group>
        {/* <mesh name="Plane004" geometry={nodes.Plane004.geometry} material={nodes.Plane004.material} position={[0.025, -0.054, 1.234]} /> */}
        <mesh name="Plane" geometry={nodes.Plane.geometry} material={materials['Material.001']} position={[0.015, -0.086, 0.071]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-1, -2.835, -1.618]} />
        <mesh name="Plane001" geometry={nodes.Plane001.geometry} material={nodes.Plane001.material} position={[0.003, 0.189, 0.042]} rotation={[1.541, -0.005, -3.138]} scale={[0.898, 1.316, 0.188]} />
        {/* <mesh name="Cylinder" geometry={nodes.Cylinder.geometry} material={nodes.Cylinder.material} position={[0, -0.002, 0]} /> */}
        <mesh name="Cylinder001" geometry={nodes.Cylinder001.geometry} material={nodes.Cylinder001.material} position={[0.006, 0.046, 0.134]} rotation={[-Math.PI, 0, 0]} scale={[-0.059, -0.03, -0.049]} />
        <group name="Sphere002" position={[0.392, 1.025, -1.104]} rotation={[Math.PI / 2, 0, 0]} scale={[-0.024, -0.025, -0.025]}>
          <mesh name="Sphere004" geometry={nodes.Sphere004.geometry} material={materials.withoutTheLine} />
          <mesh name="Sphere004_1" geometry={nodes.Sphere004_1.geometry} material={materials.line} />
        </group>
        {/* <mesh name="Plane002" geometry={nodes.Plane002.geometry} material={nodes.Plane002.material} position={[0.156, 0.306, 1.496]} scale={[0.103, 1, 0.103]} /> */}
        {/* <mesh name="Circle" geometry={nodes.Circle.geometry} material={nodes.Circle.material} position={[0.154, 0.307, 1.498]} scale={[0.099, 1, 0.099]} /> */}
      </group>
    </group>
  );

}

useGLTF.preload('/LeftServe.glb')