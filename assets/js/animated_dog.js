import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js'
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js'

const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  500
)
camera.position.z = 5

const scene = new THREE.Scene()
let golden
let sign = 1
const loader = new GLTFLoader()
loader.load('assets/3D/golden_retriever.glb',
  function (gltf) {
  golden = gltf.scene
  golden.position.x = -.1
  golden.scale.set(3.5, 3.5, 3)
  golden.position.y = -.8
  golden.rotation.y = .5
  golden.rotation.x = .5

  scene.add(golden)
},
function(xhr) {},
function(error) {}
)

const renderer = new THREE.WebGLRenderer({alpha: true})

const element = document.getElementById('header')

const logo = element.getElementsByClassName('logo')[0]

const positionInfo = logo.getBoundingClientRect()

renderer.setSize(positionInfo.width, positionInfo.height)
document.getElementById('3D_dog').appendChild(renderer.domElement)

// light
const light = new THREE.AmbientLight(0xfffff, 0.5)
scene.add(light)

const topLight = new THREE.DirectionalLight(0xffffff, 2)
topLight.position.set(500,500,500)
scene.add(topLight)

const reRender3D = () => {
  requestAnimationFrame(reRender3D)
  const element = document.getElementById('header')

  const logo = element.getElementsByClassName('logo')[0]

  const positionInfo = logo.getBoundingClientRect()

  renderer.setSize(positionInfo.width, positionInfo.height)

  if (golden.rotation.y > 1.4) {
    sign = -1
  }
  if (golden.rotation.y <= 0) {
    sign = 1
  }
  golden.rotation.y += 0.007 * sign
  renderer.render(scene, camera)
}
reRender3D()