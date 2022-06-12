import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { PerspectiveCamera } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useParams } from "react-router-dom";

function loadGLTFModel(scene, glbPath) {
	return new Promise((resolve, reject) => {
		const loader = new GLTFLoader();
		loader.load(
			glbPath,
			(gltf) => {
				const obj = gltf.scene;
				scene.add(obj);
				obj.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				resolve(obj);
			},
			undefined,
			function (error) {
				console.log(error);
				reject(error);
			}
		);
	});
}

const RenderModel = ({ url }) => {
	const refContainer = useRef();
	const [loading, setLoading] = useState(true);
	const [renderer, setRenderer] = useState();
	let state = false;

	useEffect(() => {
		const { current: container } = refContainer;
		if (container && !renderer && !state) {
			const renderer = new THREE.WebGLRenderer({
				// antialias: true,
				alpha: true,
			});
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.outputEncoding = THREE.sRGBEncoding;
			container.appendChild(renderer.domElement);
			setRenderer(renderer);
			state = true;

			const scene = new THREE.Scene();
			const camera = new PerspectiveCamera(
				75,
				window.innerWidth / window.innerHeight,
				0.00001,
				5000
			);
			camera.position.z = 0.4;
			const target = new THREE.Vector3(0, 0, 0);
			const ambientLight = new THREE.AmbientLight(0xcccccc, 1);
			scene.add(ambientLight);
			const controls = new OrbitControls(camera, renderer.domElement);
			// controls.autoRotate = true;
			controls.target = target;

			console.log(url);

			loadGLTFModel(
				scene,
				`https://negibaba.s3.ap-south-1.amazonaws.com/${url}`,
				{
					receiveShadow: false,
					castShadow: false,
				}
			).then(() => {
				animate();
				setLoading(false);
			});

			const animate = () => {
				requestAnimationFrame(animate);
				controls.update();
				renderer.render(scene, camera);
			};

			return () => {
				renderer.dispose();
			};
		}
	}, []);

	return (
		<div ref={refContainer}>
			{loading && (
				<span style={{ position: "absolute", left: "50%", top: "50%" }}>
					Loading...
				</span>
			)}
		</div>
	);
};

export default function Model() {
	let params = useParams();

	return (
		<div style={{ width: "100%", margin: "0 auto" }}>
			<h1>Model</h1>
			<RenderModel url={params.id} />
		</div>
	);
}
