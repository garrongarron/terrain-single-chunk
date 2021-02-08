// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.112.1/build/three.module.js';
import { math } from '../basic/math.js';

class HeightGenerator {
    /**
     * @param { noise.get(x, z) } generator 
     * @param { new THREE.Vector2(x, z) } position
     * @param { 100000 } minRadius 
     * @param { 100000+1 } maxRadius 
     */
    constructor(generator, position, minRadius, maxRadius) {
        this._position = position.clone();
        this._radius = [minRadius, maxRadius];
        this._generator = generator;
    }

    Get(x, y) {
        const distance = this._position.distanceTo(new THREE.Vector2(x, y));
        let normalization = 1.0 - math.sat(
            (distance - this._radius[0]) / (this._radius[1] - this._radius[0])
        );
        normalization = normalization * normalization * (3 - 2 * normalization);

        return [this._generator.Get(x, y), normalization];
    }
}

export default HeightGenerator