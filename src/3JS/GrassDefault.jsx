/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 GrassDefault.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function GrassModel(props) {
  const { nodes, materials } = useGLTF('/GrassDefault.glb')
  return (
    <group {...props} dispose={null} scale={[1.5,1.5,1.5]} position={[0,-1,0]}>
      <mesh geometry={nodes.Plane001.geometry} material={materials.baseColor} position={[2.2, -0.257, -4.074]} scale={4.761} />
      <lineSegments geometry={nodes.Mesh.geometry} material={nodes.Mesh.material} />
    </group>
  )
}

useGLTF.preload('/GrassDefault.glb')