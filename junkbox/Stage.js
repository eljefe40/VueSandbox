import * as THREE from 'three-full'
import * as _ from 'underscore'

export class Stage {
    constructor(containerId, options) {
        // ----------------------------------------------------------
        let container = document.getElementById(containerId)
        let renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setClearColor('#444444', 1);
        container.appendChild(renderer.domElement);
        console.log(renderer.domElement)
        this.renderer = renderer;
        this.container = container;
        this.scenes=[]
        this.scenes[0] = new SceneFactory(containerId).scene;

    }

    resize() {
        this.scenes[0].camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.scenes[0].camera.updateProjectionMatrix();
        console.log(this.container.clientWidth, this.container.clientHeight)
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
}

export class SceneFactory {
    constructor(containerId, options) {
        let defaults = {
            cameraFov: 45,
            cameraAspect: 16 / 9,
            cameraNear: 1,
            cameraFar: 3000,
        };
        options = _.extend(defaults, options);

        let scene = new THREE.Scene();

        scene.userData.domElement=document.getElementById(containerId)
        // this.scene = scene;
        // ----------------------------------------------------------
        let camera = new THREE.PerspectiveCamera(options.cameraFov, options.cameraAspect, options.cameraNear, options.cameraFar);
        camera.up.set(0, 1, 0);
        camera.position.set(0, 0, 300)
        scene.add(camera);
        scene.camera = camera;

        // ----------------------------------------------------------
        let boxGeo = new THREE.BoxGeometry(100, 100, 100, 10, 10, 10);
        let boxMat = new THREE.MeshLambertMaterial({
            color: 'blue',
            opacity: 1,
            transparent: true,
            wireframe: false
        });
        let box = new THREE.Mesh(boxGeo, boxMat);
        box.name = 'Box';
        scene.add(box);
        scene.box = box;
        // ----------------------------------------------------------
        let light1 = new THREE.DirectionalLight();
        light1.position.set(0, 30, 20);
        scene.add(light1);
        scene.light1 = light1;

        let light2 = new THREE.AmbientLight(0x666666);
        scene.add(light2);
        scene.light2 = light2;

        // ----------------------------------------------------------
        let orbit = new THREE.OrbitControls(scene.camera, scene.userData.domElement);

        orbit.enableZoom = true;
        orbit.enablePan = false;
        orbit.enableDamping = true;
        orbit.rotateSpeed = 0.1;
        orbit.zoomSpeed = .3;
        orbit.panSpeed = 0.2;
        orbit.dampingFactor = 0.1;
        orbit.maxPolarAngle = 2;
        orbit.minPolarAngle = 1;
        orbit.maxAzimuthAngle = 1;
        orbit.minAzimuthAngle = -1;
        orbit.keys = [65, 83, 68];
        scene.orbit = orbit;

        // ==+++++++++++++++++++++++++++++++++++++++++

        this.scene = scene;
    }

}
