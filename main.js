import { OrbitControls } from './OrbitControls.js';
import * as THREE from './three.module.js';
import { GLTFLoader } from './GLTFLoader.js';

//Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
//Change background color
renderer.setClearColor("#2c3e50")
//Set size
renderer.setSize( window.innerWidth, window.innerHeight );
//Append to body
document.body.appendChild( renderer.domElement );
//Resize 
window.addEventListener('resize', () => {
renderer.setSize(window.innerWidth, window.innerHeight);
camera.aspect = window.innerWidth / window.innerHeight

camera.updateProjectionMatrix()
})


const geometry = new THREE.SphereGeometry()
const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
// material.alphaMap = texture
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 10;
camera.position.x = 50;
camera.position.y = 30;

const animate = function () {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate();

 const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI /2
const loader = new GLTFLoader();
loader.load( './CityScape2.gltf', function ( gltf ) {
	scene.add( gltf.scene );
	console.log(gltf.scene.children.filter(name => name=="Building001")[0])
	 

}, undefined, function ( error ) {

	console.error( error );

} );

const light = new THREE.PointLight(0xffffff, 2, 500);
light.position.x= 30;
light.position.z = 30;
light.position.y = 50;
scene.add(light);