import {Suspense} from "react";
import { PerspectiveCamera, Environment, OrbitControls, useDepthBuffer, SpotLight, Cylinder, KeyboardControls } from "@react-three/drei";
import { SphereEnv } from "./SphereEnv";
import { Landscape } from "./Landscape";
import { Canvas, useFrame, useThree } from "@react-three/fiber"; 
import { Vector3 } from "three";
import { useRef } from "react";
import {Physics, RigidBody, CylinderCollider} from "@react-three/rapier"
import AnyaController from "./AnyaController";
import { useMemo } from "react";

function Cilindro() {
  return(
    <>
      <RigidBody colliders="trimesh" type="fixed" position-y={-1} friction={2}>
        {/* <CylinderCollider args={[1/2, 5]}/> */}
        <Cylinder scale={[5,1,5]} radia  receiveShadow>
          <meshStandardMaterial color="white" />
        </Cylinder>
      </RigidBody>

      <AnyaController />
    </>
  )
}

function Scene() {
  const depthBuffer = useDepthBuffer({ frames: 1 })
  return (
    <>
      <MovingSpot depthBuffer={depthBuffer} color="#ffffff" position={[3, 3, 2]} />
      {/* <MovingSpot depthBuffer={depthBuffer} color="#b00c3f" position={[1, 3, 0]} /> */}
      <mesh receiveShadow position={[0, -1, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[50, 50]} />
        <meshPhongMaterial />
      </mesh>
    </>
  )
}

function MovingSpot({ vec = new Vector3(), ...props }) {
  const light = useRef()
  const viewport = useThree((state) => state.viewport)
  // useFrame((state) => {
  //   light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
  //   light.current.target.updateMatrixWorld()
  // })
  return <SpotLight castShadow ref={light} penumbra={1} distance={10} angle={0.70} attenuation={5} anglePower={4} intensity={2} {...props} />
}

export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

function App() {
  const map = useMemo(() => [
    { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
  ], [])
  // return (
  //   <>
  //     {/* <SphereEnv /> */}
  //     <Environment background={false} files={"assets/textures/envmap.hdr"} />

  //     <PerspectiveCamera makeDefault position={[0, 10, 10]} />
  //     <OrbitControls target={[0, 0, 0]}/>

  //     {/* <Landscape />   */} 

  //     <directionalLight
  //       castShadow
  //       color={"#f3d29a"}
  //       intensity={2}
  //       position={[10, 5, 4]}
  //       shadow-bias={-0.0005}
  //       shadow-mapSize-width={1024}
  //       shadow-mapSize-height={1024}
  //       shadow-camera-near={0.01}
  //       shadow-camera-far={20}
  //       shadow-camera-top={6}
  //       shadow-camera-bottom={-6}
  //       shadow-camera-left={-6.2}
  //       shadow-camera-right={6.4}
  //     />
  //   </>
  // );
  return(
    <KeyboardControls map={map}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [-2, 2, 6]}}>
        <Suspense fallback={null}>
          <color attach="background" args={['#202020']} />
          {/* <fog attach="fog" args={['#b4b4b4', 5, 20]} /> */}
          <ambientLight intensity={0.015} />
          <OrbitControls makeDefault/>
          <Scene />

          <Physics debug>
            <Cilindro />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  )
}

export default App;
