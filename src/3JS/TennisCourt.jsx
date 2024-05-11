/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 TennisCourt.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function CourtDefault(props) {
  const { nodes, materials } = useGLTF('/TennisCourt.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0.319, 0.466, 1.489]} rotation={[-0.058, 0, 1.904]} scale={[0.01, 0.068, 0.007]}>
        <mesh geometry={nodes.Cube003_1.geometry} material={materials['horizontal wires.001']} />
        <mesh geometry={nodes.Cube003_2.geometry} material={materials['vertical wires.001']} />
        <mesh geometry={nodes.Cube003_3.geometry} material={materials['holder.001']} />
        <mesh geometry={nodes.Cube003_4.geometry} material={materials['curve.001']} />
        <mesh geometry={nodes.Cube003_5.geometry} material={materials['base.001']} />
      </group>
      <mesh geometry={nodes.Plane.geometry} material={materials['Material.001']} position={[0.015, -0.086, 0.071]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-1, -2.835, -1.618]} />
      <mesh geometry={nodes.Plane001.geometry} material={nodes.Plane001.material} position={[0.003, 0.189, 0.042]} rotation={[1.541, -0.005, -3.138]} scale={[0.898, 1.316, 0.188]} />
      <mesh geometry={nodes.Cylinder001.geometry} material={nodes.Cylinder001.material} position={[0.006, 0.046, 0.134]} rotation={[-Math.PI, 0, 0]} scale={[-0.059, -0.03, -0.049]} />
      <group position={[0.082, -0.011, -1.104]} rotation={[Math.PI / 2, 0, 0]} scale={[-0.024, -0.025, -0.025]}>
        <mesh geometry={nodes.Sphere004.geometry} material={materials.withoutTheLine} />
        <mesh geometry={nodes.Sphere004_1.geometry} material={materials.line} />
      </group>
      <group position={[-0.359, 0.526, -1.249]} rotation={[-0.1, -0.002, -1.9]} scale={[0.01, 0.068, 0.007]}>
        <mesh geometry={nodes.Cube001_1.geometry} material={materials.base} />
        <mesh geometry={nodes.Cube001_2.geometry} material={materials.curve} />
        <mesh geometry={nodes.Cube001_3.geometry} material={materials.holder} />
        <mesh geometry={nodes.Cube001_4.geometry} material={materials['vertical wires']} />
        <mesh geometry={nodes.Cube001_5.geometry} material={materials['horizontal wires']} />
      </group>
    </group>
  )
}

useGLTF.preload('/TennisCourt.glb')
