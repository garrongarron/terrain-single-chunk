
// let chunkParams = {
//     offset: { x: 0, y: -70, z: 0 },
//     scale: 1,
//     width: 500,
//     heightGenerators: [heightMaker], //?? array
//     scene : null
// }
class TerrainChunk {
    constructor(params) {
        this._params = params;
        this._Init(params);
    }

    _Init(params) {
        const size = new THREE.Vector3(
            params.width * params.scale, 0, params.width * params.scale);

        this._plane = new THREE.Mesh(
            new THREE.PlaneGeometry(size.x, size.z, 64, 64),//64 64
            new THREE.MeshStandardMaterial({
                wireframe: false,
                // color: 0xFFFFFF,
                color: 0xff6600,
                side: THREE.FrontSide,
                vertexColors: THREE.VertexColors,
            }));
        this._plane.position.add(params.offset);
        this._plane.castShadow = false;
        this._plane.receiveShadow = true;

        params.scene.add(this._plane);
        this._plane.rotation.x = -Math.PI/2
        this.Rebuild();
    }

    Rebuild() {
        const offset = this._params.offset;
        for (let v of this._plane.geometry.vertices) {
            const heightPairs = [];
            let normalization = 0;
            v.z = 0;
            for (let gen of this._params.heightGenerators) {
                let hi = gen.Get(
                    v.x + offset.x,
                    v.y + offset.y
                )
                heightPairs.push(hi);
                normalization += heightPairs[heightPairs.length - 1][1];
            }

            if (normalization > 0) {
                for (let h of heightPairs) {
                    v.z += h[0] * h[1] / normalization;
                }
            }
        }

        // for (let f of this._plane.geometry.faces) {
        //     f.vertexColors = [
        //         new THREE.Color(0x00FF00),
        //         new THREE.Color(0x00FF00),
        //         new THREE.Color(0x00FF00),
        //     ];
        // }

        this._plane.geometry.verticesNeedUpdate = true;
        this._plane.geometry.computeVertexNormals();
    }
}

export default TerrainChunk