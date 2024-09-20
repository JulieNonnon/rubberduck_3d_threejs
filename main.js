// import * as THREE from 'three'
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Utiliser un modèle .gltf 🐤
// exemple : https://polyhaven.com/fr/a/rubber_duck_toy

// Setup basique Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Mise en place d'un controle orbital (avec la souris)
const controls = new OrbitControls( camera, renderer.domElement );

// Ajout d'une Skybox
const skyboxLoader = new THREE.CubeTextureLoader();
const texture = skyboxLoader.load([
  '/assets/images/px.jpg',  // Face droite
  '/assets/images/nx.jpg',  // Face gauche
  '/assets/images/py.jpg',  // Face haut
  '/assets/images/ny.jpg',  // Face bas
  '/assets/images/pz.jpg',  // Face avant
  '/assets/images/nz.jpg'   // Face arrière
]);
scene.background = texture;

// Met à jour la taille du canvas lors du redimensionnement
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Positionnement de la caméra
camera.position.set(0, 1, 10)
controls.update();

// Lumière
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Lumière ambiante supplémentaire
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(ambientLight);

// Charger le modèle GLTF/GLB
const loader = new GLTFLoader();

loader.load(
  'models/rubber_duck_toy_4k.gltf', 
  function (gltf) {
    const model = gltf.scene;
    
    scene.add(model);

    // Ajuster l'échelle et la position si nécessaire
    model.scale.set(20, 20, 20); 
    model.position.set(0, -2, 0);

    // Charger la texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('models/rubber_duck_toy_4k.jpg', // Remplace par le nom de ta texture
      function (texture) {
        // Appliquer la texture au matériau du Mesh
        const mesh = model.children[0]; // Supposant qu'il n'y a qu'un seul Mesh
        mesh.material.map = texture; // Appliquer la texture
        mesh.material.needsUpdate = true; // Indique à Three.js que le matériau a changé
        console.log(mesh.material); // Inspecter le matériau
        },
      undefined,
      function (error) {
        console.error('Erreur de chargement de la texture', error);
      }
    );

    // Animation de rotation
    const animate = function () {
      requestAnimationFrame(animate);
      model.rotation.y += 0.02;
      renderer.render(scene, camera);
    };

    animate();

  },
  undefined,
  function (error) {
    console.error('Erreur de chargement du modèle', error);
  }
);