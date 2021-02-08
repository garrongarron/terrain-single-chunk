import '../../js/simplex-noise.js';

let params = {
    octaves: 10,
    persistence: 0.5,
    lacunarity: 2.0,
    exponentiation: 3.9,
    height: 64,
    scale: 256.0,
    seed: 1
};

class NoiseGenerator {
    constructor(params) {
        this._params = params;
        this.noise = new SimplexNoise(this._params.seed);
    }

    Get(x, y) {
        const xs = x / this._params.scale;
        const ys = y / this._params.scale;
        const noiseFunc = this.noise
        let amplitude = 1.0;
        let frequency = 1.0;
        let normalization = 0;
        let total = 0;
        for (let o = 0; o < this._params.octaves; o++) {
            const noiseValue = noiseFunc.noise2D(xs * frequency, ys * frequency) * 0.5 + 0.5;
            total += noiseValue * amplitude;
            normalization += amplitude;
            amplitude *= this._params.persistence;
            frequency *= this._params.lacunarity;
        }
        total /= normalization;
        return Math.pow(total, this._params.exponentiation) * this._params.height;
    }
}
export default NoiseGenerator

export { params }