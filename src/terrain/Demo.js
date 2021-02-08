import NoiseGenerator, { params as defaultNoiseParams } from './NoiseGenerator.js'
import HeightGenerator from './HeightGenerator.js'
import TerrainChunk from './TerrainChunk.js'

let noiseParams = defaultNoiseParams;

noiseParams = {
    octaves: 10,
    persistence: 0.5,
    lacunarity: 2.0,
    exponentiation: 2,
    height: 50,
    scale: 256.0,
    seed: 0.2
};

let heightMaker = new HeightGenerator(
    new NoiseGenerator(noiseParams),
    new THREE.Vector2(0, 0), //where
    100000,//min
    100000 + 1//max
)

let chunkParams = {
    offset: { x: 0, y: -10, z: 0 },
    scale: 1,
    width: 500,
    heightGenerators: [heightMaker], //?? array
    scene : null
}


let setChunk = (scene) =>{
    chunkParams.scene = scene
    let chunk = new TerrainChunk(chunkParams)
}

export default setChunk