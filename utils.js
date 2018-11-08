var Utils =  {};

Utils.createShadow = function (mesh, material) {
    var params = mesh.geometry.parameters;
    mesh.geometry.computeBoundingSphere();
    var geo = mesh.geometry.type === 'BoxGeometry'
        ? new THREE.PlaneGeometry(params.width, params.depth)
        : new THREE.CircleGeometry(mesh.geometry.boundingSphere.radius, 24);

    var shadow = new THREE.Mesh(geo, material);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.x = mesh.position.x;
    shadow.position.z = mesh.position.z;

    return shadow;
};

Utils.updateShadow = function (shadow, target) {
    shadow.position.x = target.position.x;
    shadow.position.z = target.position.z;
    shadow.visible = target.position.y >= 0;

    shadow.scale.x = target.scale.x;
    shadow.scale.y = target.scale.z;
};
