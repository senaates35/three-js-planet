import {
	Environment,
	OrbitControls,
	PerspectiveCamera,
	Stars,
	Plane,
	Ring,
	RoundedBox,
	Circle,
	Torus,
} from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { DirectionalLight, MeshStandardMaterial } from "three";
import { angleToRadians } from "../../utils/angle";
import gsap from "gsap";
import img from "../../assets/saturn.jpg";
import ring from "../../assets/ring.jpg";
import sun from "../../assets/sun.jpg";
import * as THREE from "three";

const Three = () => {
	const orbitControlsRef = useRef(null);
	const cylinderControlRef = useRef(null);
	const torusRef = useRef(null);
	const sunRef = useRef(null);
	const lightPosition = [3, 20, 3];
	const texture = useLoader(THREE.TextureLoader, img);
	const ringTexture = useLoader(THREE.TextureLoader, ring);
	const sunTexture = useLoader(THREE.TextureLoader, sun);

	// Code to move camera
	useFrame((state) => {
		if (!!orbitControlsRef.current) {
			const { x, y } = state.mouse;
			orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(90));
			// console.log(y);

			orbitControlsRef.current.setPolarAngle(
				y ? (y + 1) * angleToRadians(90) : 0.5 * angleToRadians(80)
			);
			orbitControlsRef.current.update();
		}
		if (!!ballRef.current) {
			ballRef.current.rotation.y = state.clock.getElapsedTime() * 2;
		}
		if (!!torusRef.current) {
			torusRef.current.rotation.z = state.clock.getElapsedTime() * 0.4;
		}
		if (!!sunRef.current) {
			sunRef.current.rotation.z = state.clock.getElapsedTime() * 0.4;
		}
	});

	//	Animation
	const ballRef = useRef(null);

	useEffect(() => {
		console.log(orbitControlsRef);

		if (!!ballRef.current) {
			console.log(ballRef.current);

			//	x-axis animation

			const timeline = gsap.timeline();

			timeline.to(ballRef.current.position, {
				y: -1,
				duration: 2,
				ease: "bounce",
			});
			timeline.to(
				ballRef.current.position,
				{
					x: 3,
					z: 3,
					duration: 3,
				},
				"<"
			);
			timeline.to(
				ballRef.current.position,
				{
					y: 5,
					duration: 2,
				},
				">"
			);
		}
		if (!!torusRef.current) {
			//	x-axis animation

			const timeline = gsap.timeline();

			timeline.to(torusRef.current.position, {
				y: -1,
				duration: 2,
				ease: "bounce",
			});
			timeline.to(
				torusRef.current.position,
				{
					x: 3,
					z: 3,
					duration: 3,
				},
				"<"
			);
			timeline.to(
				torusRef.current.position,
				{
					y: 5,
					duration: 2,
				},
				">"
			);
		}
	}, [ballRef, torusRef]);

	return (
		<>
			<PerspectiveCamera
				makeDefault
				position={[0, 1, 100]}
				rotation={[Math.PI / 2, 0, 0]}
			/>
			<OrbitControls
				ref={orbitControlsRef}
				minPolarAngle={angleToRadians(60)}
				maxPolarAngle={angleToRadians(80)}
			/>

			{/* Ball */}
			<mesh
				castShadow
				receiveShadow
				ref={ballRef}
				position={[-20, 20, -20]}
				rotation={[angleToRadians(30), 0, 0]}
			>
				<sphereGeometry
					args={[1, 32, 32]}
					attach="geometry"
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<meshBasicMaterial
					metalness={1}
					roughness={0.1}
					map={texture}
					attach="material"
				/>
			</mesh>
			{/* Ball */}
			<mesh position={[-7, 40, -7]} ref={sunRef}>
				<sphereGeometry args={[3, 32, 32]} />
				<meshBasicMaterial map={sunTexture} />
			</mesh>

			{/* Platform */}

			<mesh
				ref={torusRef}
				rotation={[-angleToRadians(70), 0, 0]}
				position={[-20, 20, -20]}
				castShadow
			>
				<torusGeometry args={[2, 0.5, 2, 100]} />
				<meshBasicMaterial
					metalness={1}
					roughness={0.1}
					map={ringTexture}
					attach="material"
				/>
			</mesh>

			{/* Floor */}
			<mesh
				rotation={[-angleToRadians(90), 0, 0]}
				position={[0, -2, 0]}
				receiveShadow
			>
				<planeGeometry args={[50, 50]} />
				<meshStandardMaterial color="#0204057a" />
			</mesh>

			{/* Ambient Light */}
			<ambientLight args={["#ffffff", 0.1]} />

			{/* Spotlight */}
			<spotLight
				castShadow
				intensity={5}
				distance={33}
				decay={2}
				angle={Math.PI / 10}
				position={lightPosition}
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
				lookAt={[5, 5, 5]}
			/>

			{/* Environment */}
			<Stars />
		</>
	);
};

export default Three;
