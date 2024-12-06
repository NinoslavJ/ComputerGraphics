import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(1, 1, 2);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

//Textures
const textureLoader = new THREE.TextureLoader();
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg');
const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5), 
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent:true,
        alphaMap:simpleShadow
    })
);
sphereShadow.rotation.x= -Math.PI*0.5;
sphereShadow.position.y= plane.position.y +0.01;
scene.add(sphere,sphereShadow,plane);

//Lights
const directionaLightcameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
directionaLightcameraHelper.visible = false;
scene.add(directionaLightcameraHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.radius = 10;
directionalLight.position.set(2,2,-1);
scene.add(directionalLight);



renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
const spotLight = new THREE.SpotLight(0xffffff, 3.6, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.shadow.mapSize.set(1024,1024); 
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 6;
spotLight.position.set(0,2,2);
const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(spotLightCameraHelper);
scene.add(spotLight);
scene.add(spotLight.target);

const pointLight = new THREE.PointLight(0xffffff, 2.7);
pointLight.castShadow = true;
pointLight.shadow.mapSize.set(1024,1024);
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 5;
pointLight.position.set(-1,1,0);
const pointLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
pointLightCameraHelper.visible=true;
scene.add(pointLightCameraHelper);
scene.add(pointLight);

const material = new THREE.MeshStandardMaterial({ roughness: 0.7, metalness: 0 });

//Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
//Set the sphere cast shadow
sphere.castShadow = true;

//Plane parent object
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
//Set the plane object to recive shadow
plane.receiveShadow = true;


plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

scene.add(sphere, plane);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Resize handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    sphere.position.x = Math.cos(elapsedTime) * 1.5;
    sphere.position.z = Math.sin(elapsedTime) * 1.5;
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

    sphereShadow.position.x = sphere.position.x;
    sphereShadow.position.y = sphere.position.z;
    sphereShadow.material.opacity = (1-sphere.position.y) * 0.3;

    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

animate();