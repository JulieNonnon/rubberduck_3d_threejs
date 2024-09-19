import * as THREE from 'three'

const scene = new THREE.Scene() // les élémeents de la scène

const camera = new THREE.PerspectiveCamera(70, iw/ih) //focale et ratio écran

const geometry = new THREE.BoxGeometry(1, 1, 1) //la géométrie, ici un cube
//const material = new THREE.MeshBasicMaterial( {color: 0xffffff}) //le shader
const material = new THREE.MeshPhongMaterial( {color: 0xffffff})
const mesh = new THREE.Mesh(geometry, material) // objet présent sur scene, la geometrie et le shader

const light = new THREE.PointLight(0xeeeeee)

scene.add(mesh) // ajout de notre objet à la scene
scene.add(light) // ajout lumière

camera.position.set(0, 0, 2) // positionnement camera, pour voir notre objet
light.position.set(0, 0, 2) //positionnement lumière sur l'objet

const renderer = new THREE.WebGLRenderer({canvas}) //camera genere matrice qui transpose objets du pov de l'observateur, avec moteur de rendu WebGL

loop() // mise en place animation boucle

function loop() {
    requestAnimationFrame(loop)
    mesh.rotation.y += 0.02
    mesh.rotation.x += 0.01
    renderer.render(scene, camera) // rendu avec scene et camera, besoin d'une geometry
}

