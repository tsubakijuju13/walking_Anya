"use client"
import { Text, useGLTF } from "@react-three/drei";
import { applyProps } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { Color } from "three";



export function Anya(props) {
    const [chat, setChat] = useState(false)
    const [index, setIndex] = useState(0)
    const { nodes, materials, scene } = useGLTF("/assets/models/anya.glb");

    useLayoutEffect(() => {
        scene.traverse((o) => {
            if(o.isMesh){
                o.castShadow = true;
                o.receiveShadow = true;
            }
        })
    }, [scene])
    /**
     * Necesito varios casos:
     *      * El puntero entra en el area de Anya
     *         * Se muestra el primer texto 
     *      * El puntero sale del area de Anya
     *          * Desaparece el texto
     *      * El usuario hace click en Anya
     *          * Se acerca la camara
     *          * Se muestra el segundo texto
     *          * Si se sale el puntero del area de Anya no pasa nada
     *      * Cuando se termina todo se vuelve a la posicion inicial
     */

    return (
        <>
            <group 
                {...props} 
                dispose={null} 
            >

                <primitive object={nodes.GLTF_created_0_rootJoint} />
                <skinnedMesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_7.geometry}
                    material={materials.Main}
                    skeleton={nodes.Object_7.skeleton}
                />
                <skinnedMesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_8.geometry}
                    material={materials.Outline}
                    skeleton={nodes.Object_8.skeleton}
                />
                <skinnedMesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_10.geometry}
                    material={materials.Main}
                    skeleton={nodes.Object_10.skeleton}
                />
                <skinnedMesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_12.geometry}
                    material={materials.Hair}
                    skeleton={nodes.Object_12.skeleton}
                />
                <skinnedMesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_13.geometry}
                    material={materials.Outline}
                    skeleton={nodes.Object_13.skeleton}
                />
            </group>
        </>
        
    );
}

useGLTF.preload("/assets/models/anya.glb");