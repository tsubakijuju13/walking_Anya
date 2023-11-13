import { useKeyboardControls } from "@react-three/drei";
import { Anya } from "./Anya";
import { RigidBody, CapsuleCollider } from "@react-three/rapier"
import { Controls } from "./App";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const JUMP_FORCE = 0.2;
const MOVEMENT_SPEED = 0.04;
const MAX_VEL = 3;

export default function AnyaController() {
    const jumpPress = useKeyboardControls((state) => state[Controls.jump])
    const leftPress = useKeyboardControls((state) => state[Controls.left])
    const rightPress = useKeyboardControls((state) => state[Controls.right])
    const backPress = useKeyboardControls((state) => state[Controls.back])
    const forwardPress = useKeyboardControls((state) => state[Controls.forward])

    const bodyRef = useRef()
    const personajeRef = useRef()
    const isFloor = useRef(true)
    useFrame(() => {
        const impulso = {x: 0, y: 0, z: 0}
        const impulsoLimit = bodyRef.current.linvel()

        if(jumpPress && isFloor.current){
            impulso.y += JUMP_FORCE
            console.warn("JUMP")
            isFloor.current = false
        }

        var rotate = false
        if(rightPress && impulsoLimit.x < MAX_VEL) {
            impulso.x += MOVEMENT_SPEED
            rotate = true
        }

        if(leftPress  && impulsoLimit.x > -MAX_VEL) {
            impulso.x -= MOVEMENT_SPEED
            rotate = true
        }

        if(backPress  && impulsoLimit.z < MAX_VEL) {
            impulso.z += MOVEMENT_SPEED
            rotate = true
        }

        if(forwardPress  && impulsoLimit.z > -MAX_VEL) {
            impulso.z -= MOVEMENT_SPEED
            rotate = true
        }

        bodyRef.current.applyImpulse(impulso, true)
        if(rotate)
            personajeRef.current.rotation.y = Math.atan2(impulsoLimit.x, impulsoLimit.z)
            //personajeRef.current.rotation.y = Math.atan2(impulso.x, impulso.z)
    })
    
  return (
    <group>
        <RigidBody 
            ref={bodyRef} 
            colliders={false} 
            scale={[0.5, 0.5, 0.5]} 
            enabledRotations={[false, false, false]} 
            onCollisionEnter={() => {
                isFloor.current = true
            }}>
            <CapsuleCollider args={[0.45, 0.4]} position={[0, 0.81, 0]} />
            <group ref={personajeRef}>
                <Anya />
            </group>
        </RigidBody>
    </group>
  )
}
