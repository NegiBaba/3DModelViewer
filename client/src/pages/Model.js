import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { PerspectiveCamera } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useNavigate, useParams } from "react-router-dom";

import { Box, CircularProgress, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

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
	let aspect = window.innerWidth / window.innerHeight;
	const camera = new PerspectiveCamera(75, aspect, 0.00001, 5000);

	window.addEventListener("resize", () => {
		if (renderer) {
			renderer.setSize(window.innerWidth, window.innerHeight);
		}
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	});

	useEffect(() => {
		const { current: container } = refContainer;

		if (container && !renderer && !state) {
			const renderer = new THREE.WebGLRenderer({});

			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.outputEncoding = THREE.sRGBEncoding;
			container.appendChild(renderer.domElement);
			setRenderer(renderer);
			state = true;

			const scene = new THREE.Scene();
			const target = new THREE.Vector3(0, 0, 0);
			const ambientLight = new THREE.AmbientLight(0xffffff, 1);
			const controls = new OrbitControls(camera, renderer.domElement);

			scene.background = new THREE.Color(0x8c8c8c);
			camera.position.z = 0.4;
			scene.add(ambientLight);
			controls.target = target;

			loadGLTFModel(scene, url, {
				receiveShadow: false,
				castShadow: false,
			}).then(() => {
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
				<Box
					container
					sx={{
						top: "0",
						left: "0",
						width: "100vw",
						zIndex: "1040",
						height: "100vh",
						position: "absolute",
						backgroundImage: "linear-gradient(to right, #8041CA, #71D4E2)",
					}}
				>
					<CircularProgress
						size="4rem"
						sx={{
							top: "50%",
							left: "50%",
							color: "#832fef",
							position: "absolute",
							transform: "translate(-50%, -50%)",
						}}
					/>
				</Box>
			)}
		</div>
	);
};

export default function Model() {
	let params = useParams();
	let navigate = useNavigate();
	const [fileUrl, setFileUrl] = useState(null);

	const goToHome = () => {
		navigate("/");
	};

	const fetchModelUrl = (name) => {
		axios
			.get(`http://localhost:3000/api/models/${params.id}`)
			.then((res) => {
				setFileUrl(res.data.url);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		if (!fileUrl) {
			fetchModelUrl();
		}
	}, []);

	return (
		<Box>
			<IconButton
				aria-label="close"
				onClick={goToHome}
				sx={{
					top: "30px",
					left: "30px",
					bgcolor: "rgba(255, 255, 255, 0.3)",
					position: "absolute",
				}}
			>
				<CloseIcon />
			</IconButton>
			{fileUrl && <RenderModel url={fileUrl} />}
		</Box>
	);
}
