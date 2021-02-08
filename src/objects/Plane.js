const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(500, 500, 10, 10),
    new THREE.MeshStandardMaterial({
        color: 0x1a75ff,
    }));
plane.castShadow = false;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;

export default plane