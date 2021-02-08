import { directionalLight, ambientLight } from './basic/Lights.js'
import texture from './basic/Cube.js'
import plane from './objects/Plane.js'
import box from './objects/Box.js'

import setChunk from './terrain/Demo.js'

const scene = new THREE.Scene();

scene.add(directionalLight);
scene.add(ambientLight);

scene.add(plane);
setChunk(scene);


scene.add(box);

// scene.background = texture;

export default scene