import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'


// WebGL renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


// Scene, Camera
const scene = new THREE.Scene()

const hdrUrl = new URL('/textures/horizon.hdr', import.meta.url)
new RGBELoader().load(hdrUrl, texture => {
  const gen = new THREE.PMREMGenerator(renderer)
  const envMap = gen.fromEquirectangular(texture).texture
  
  scene.environment = envMap
  scene.background = envMap
  
  texture.dispose()
  gen.dispose()
})


const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

camera.position.set(50, 0, 0)
// // add metal sphere
// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(0.5, 32, 32),
//   new THREE.MeshStandardMaterial({
//     color: 0xaaaaaa,
//     metalness: 1,
//     roughness: 0.1,
//   })
// )
// scene.add(sphere)



// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enablePan = false

// Load GLTF
const loader = new GLTFLoader()

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
loader.setDRACOLoader(dracoLoader)

loader.load(
  '/models/earpiece.glb',
  function (gltf) {
    gltf.scene.position.set(0, -5, 0)
    scene.add(gltf.scene)
  },
  // called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
)



// Render loop
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate()

// Window sizing
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
