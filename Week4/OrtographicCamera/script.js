import * as THREE from 'three';
const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(5, 5, 5);
scene.add(light);


scene.add(light);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshPhongMaterial({
    color: 0x00ff00,         
    shininess: 100,          
    specular: 0x555555        
  });
const box = new THREE.Mesh(boxGeometry, boxMaterial);


const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,         
    shininess: 100,          
    specular: 0x555555        
  });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

const cylinderGeometry = new THREE.CylinderGeometry( 1, 1, 2, 32 );
const cylinderMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,         
    shininess: 100,          
    specular: 0x555555        
  }); 
const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial ); 

box.position.x = -4;
sphere.position.x = 4;
cylinder.position.z = -7;

scene.add(cylinder);
scene.add(box)
scene.add(sphere)


const sizes = {
    width: 800,
    height: 600
}

const orthoCamera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0, 120);

const camera = new THREE.PerspectiveCamera(75, 800 / 600);
camera.position.z = 10;
camera.position.y = 2;
scene.add(camera);
scene.add(orthoCamera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width,sizes.height);

document.getElementById("scene").appendChild(renderer.domElement);


function limitXDistance()
{
    while(cylinder.position.x!=52)
        cylinder.position.x += 0.02;
}

const animate = () => {
    requestAnimationFrame(animate);
    cylinder.position.x+=0.02
    console.log("Cylinder postiion", cylinder.position);
    renderer.render(scene, camera);
}

animate();