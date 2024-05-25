import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useProgress, Stats } from '@react-three/drei';
import { Model } from './Factory';
import TWEEN from '@tweenjs/tween.js';
import { Raycaster, Vector2 } from 'three';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RaspberryPiMarker from "./RasspberryMarker"; 

// Locally imports  
import { distances } from "../utils/distances"; 
import { computeIBeaconObjCoords } from "../utils/calculatePosition";
import { Coord, coordR1, coordR2, coordR3 } from "../utils/Coords"; 
import Annotation from './Annotation';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function TweenUpdater() {
  useFrame(() => {
    TWEEN.update();
  });
  return null;
}

function ClickHandler() {
  const { camera, scene } = useThree();
  const raycaster = new Raycaster();

  const handlePointerDown = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 2 - 1;
    const y = -(event.clientY - rect.top) / rect.height * 2 + 1;

    raycaster.setFromCamera({ x, y }, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0 && event.detail >= 2) {
      console.log("Double clicked on object", intersects[0]);
    }
  };

  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [camera, scene]);

  return null;
}

export default function App() {
  const ref = useRef();
  const [point, setPoint] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
      const interval = setInterval(() => {
          // Select a random set of distances from the predefined list
          const randomIndex = Math.floor(Math.random() * distances.length);
          const [d1, d2, d3] = distances[randomIndex];
          const newPosition = computeIBeaconObjCoords([coordR1, coordR2, coordR3], [d1, d2, d3]);
          setPoint({ x: newPosition.yAxis, y: 0 , z: newPosition.xAxis});

          // Toast notification to inform about the position update
          // toast.info(`The point has moved to (${newPosition.yAxis}, ${newPosition.xAxis})`);
      }, 2000);
      return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Canvas camera={{ position: [-4.25, 4.93, 4.72] }}>
        <OrbitControls ref={ref} target={[5.29, 1.27, -5.07]} />
        <Suspense fallback={<Loader />}>
          <Environment preset="city" background blur={0.75} />
          <Model />
          <Annotation point={[point.x, point.y, point.z]}/>
          <RaspberryPiMarker position={[5.85, 0.25, 5.75]} />
          <RaspberryPiMarker position={[-6.15, 0.25, 5.75]} />
          <RaspberryPiMarker position={[-6.15, 0.25, -6.15]} />
          <TweenUpdater />
        </Suspense>
        <ClickHandler />
        <Stats />
      </Canvas>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}
