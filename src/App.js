import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import "./App.css";
import Three from "./components/three/Three";

function App() {
	return (
		<Canvas id="three-canvas-container" shadows>
			<Suspense fallback={null}>
				<Three />
			</Suspense>
		</Canvas>
	);
}

export default App;
