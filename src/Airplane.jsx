/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.7 public/assets/models/airplane.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { Matrix3, Matrix4, Quaternion, Vector3 } from 'three';
import { controls, updatePlaneAxis } from './controls';

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
export const planePosition = new Vector3(0, 3, 0);

const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();

export function Airplane(props) {
  const { nodes, materials } = useGLTF('assets/models/airplane.glb');
  const groupRef = useRef();
  const helixMeshRef = useRef();

  useFrame(({ camera }) => {

    updatePlaneAxis(x, y, z);
    planePosition.add(z.clone().multiplyScalar(-0.006));
    // planePosition.add(new Vector3(0,0,1).multiplyScalar(-0.01));

    const rotMatrix = new Matrix4().makeBasis(x, y, z);

    const matrix = new Matrix4()
    .multiply(new Matrix4().makeTranslation(planePosition.x, planePosition.y, planePosition.z))
    .multiply(rotMatrix);

    groupRef.current.matrixAutoUpdate = false;
    groupRef.current.matrix.copy(matrix);
    groupRef.current.matrixWorldNeedsUpdate = true;




    var quaternionA = new Quaternion().copy(delayedQuaternion);
    // careful! setting the quaternion from the rotation matrix will cause
    // issues that resemble gimbal locks, instead, always use the quaternion notation
    // throughout the slerping phase
    // quaternionA.setFromRotationMatrix(delayedRotMatrix);

    var quaternionB = new Quaternion();
    quaternionB.setFromRotationMatrix(rotMatrix);

    // if (quaternionA.dot(quaternionB) < 0) {
    //   quaternionB.x = -quaternionB.x;
    //   quaternionB.y = -quaternionB.y;
    //   quaternionB.z = -quaternionB.z;
    //   quaternionB.w = -quaternionB.w;
    // }
    // if (quaternionB.dot(quaternionA) < 0) {
    //   quaternionA.x = -quaternionA.x;
    //   quaternionA.y = -quaternionA.y;
    //   quaternionA.z = -quaternionA.z;
    //   quaternionA.w = -quaternionA.w;
    // }


    var interpolationFactor = 0.175;
    var interpolatedQuaternion = new Quaternion().copy(quaternionA);
    interpolatedQuaternion.slerp(quaternionB, interpolationFactor);
    delayedQuaternion.copy(interpolatedQuaternion);

    delayedRotMatrix.identity();
    delayedRotMatrix.makeRotationFromQuaternion(delayedQuaternion);

    const cameraMatrix = new Matrix4()
      .multiply(new Matrix4().makeTranslation(planePosition.x, planePosition.y, planePosition.z))
      .multiply(delayedRotMatrix)
      // .multiply(rotMatrix)
      .multiply(new Matrix4().makeRotationX(-0.2))
      .multiply(
        new Matrix4().makeTranslation(0, 0.015, 0.3)
      );

    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);
    camera.matrixWorldNeedsUpdate = true;

    helixMeshRef.current.rotation.z -= 1.0;
  });

  return (
    <>
      <group ref={groupRef}>
        <group {...props} dispose={null} scale={0.01} rotation-y={Math.PI}>
          <mesh geometry={nodes.supports.geometry} material={materials['Material.004']} />
          <mesh geometry={nodes.chassis.geometry} material={materials['Material.005']} />
          <mesh geometry={nodes.helix.geometry} material={materials['Material.005']} ref={helixMeshRef} />
        </group>
      </group>
    </>
  )
}

useGLTF.preload('assets/models/airplane.glb')
