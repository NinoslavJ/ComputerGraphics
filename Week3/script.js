import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene").appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 32, 32); 
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }); 
const sphere = new THREE.Mesh(geometry, material);

scene.add(sphere);
camera.position.z = 5;

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    sphere.rotation.y = elapsedTime * 0.5;   

    renderer.render(scene, camera);
}

animate();
