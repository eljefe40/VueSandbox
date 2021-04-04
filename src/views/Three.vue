<template>
  <div class="">
    <div id="stageWrapper">
      <canvas id="canvasContent" ></canvas>
      <div id="domContent"></div>
    </div>
  </div>
</template>

<script>

import * as THREE from '../lib/three.module.js';
import {OrbitControls} from '../lib/controls/OrbitControls.js';

export default {
  mounted() {
    let canvas, content,renderer;
    const scenes = [];

    let width='800px'
    let height='500px'
    let top='0px'
    let left='0px'

    init(top,left,width,height);
    animate();

    function init(top,left,width,height) {

      canvas = document.getElementById("canvasContent");
      content = document.getElementById('domContent');

      canvas.style.width=content.style.width=width;
      canvas.style.height=content.style.height=height;
      canvas.style.top=content.style.top=top;
      canvas.style.left=content.style.left=left;

      console.log("parent size tlwh:",top,left,width,height)

      const geometries = [
        new THREE.BoxBufferGeometry(1, 1, 1),
        new THREE.SphereBufferGeometry(.7, 30, 15),
      ];



      function makeScenes(instanceParams,master) {
        for (let i = 0; i < instanceParams.length; i++) {
          const scene = new THREE.Scene();
          const inner = document.createElement('div');
          inner.className = 'inner-container';
          inner.style.width = instanceParams[i].width + 'px';
          inner.style.height = instanceParams[i].height + 'px';
          scene.userData.element = inner;
          content.appendChild(inner);

          const camera = new THREE.PerspectiveCamera(50, 1, 1, 10);
          camera.position.z = 2;
          scene.userData.camera = camera;

          const controls = new OrbitControls(scene.userData.camera, scene.userData.element);
          controls.minDistance = 2;
          controls.maxDistance = 5;
          controls.enablePan = false;
          controls.enableZoom = true;
          scene.userData.controls = controls;

          const geometry = geometries[1];
          const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
            roughness: 0.5,
            metalness: 0,
            flatShading: true
          });
          scene.add(new THREE.Mesh(geometry, material));
          scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));

          const light = new THREE.DirectionalLight(0xffffff, 0.5);
          light.position.set(1, 1, 1);
          scene.add(light);
          scenes.push(scene);
        }
        return scenes;
      }

      let html_snip = [];
      html_snip = document.getElementsByClassName('source')

      const instanceParams = [
        {width:100,height:100,a: 1, b: 'apples', o: html_snip[0]},            // make a reference to a visible object
        {width:100,height:100,a: 2, b: 'bananas', o: html_snip[1]},
        {width:100,height:100,a: 3, b: 'watermellon', o: html_snip[2]},
        {width:100,height:100,a: 4, b: 'lemons', o: html_snip[3]},
        {width:100,height:100,a: 5, b: 'persimmon', o: html_snip[5]},
        {width:100,height:100,a: 5, b: 'persimmon', o: html_snip[5]},
        {width:100,height:100,a: 5, b: 'persimmon', o: html_snip[5]}
      ]

      let master={};

      let s = makeScenes( instanceParams,master);


      renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
      renderer.setClearColor(0x444444, 1);
      renderer.setPixelRatio(window.devicePixelRatio);
    }

    function updateSize() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;


      if (canvas.width !== width || canvas.height !== height) {
        renderer.setSize(width, height, false);
      }
    }

    function animate() {
      render();
      requestAnimationFrame(animate);
    }

    function render() {
      updateSize();
      renderer.setClearColor(0x303030, 1);
      renderer.setScissorTest(false);
      renderer.clear();
      renderer.setClearColor(0x707070, 1);
      renderer.setScissorTest(true);
      scenes.forEach(function (scene) {

        // get the element that is a place holder for where we want to
        const e = scene.userData.element;
        const c = renderer.domElement

        const w = e.offsetWidth
        const h = e.offsetHeight
        const l = e.offsetLeft
        const b = c.offsetHeight - (e.offsetTop + e.offsetHeight)

        renderer.setViewport(l, b, w, h);
        renderer.setScissor(l, b, w, h);

        const camera = scene.userData.camera;
        camera.aspect = w / h; // not changing in this example
        camera.updateProjectionMatrix();

        scene.userData.controls.update();
        renderer.render(scene, camera);
      });
    }
  }
}

</script>
<style>


#stageWrapper{
  position:absolute;
  display:flex;
  flex-direction: row;


  width:600px;
  height:600px;

  /*top: 10px;*/
  /*left: 10px;*/

}

#domContent,
#canvasContent {
  /*flex:1;*/
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  position: absolute;

}

.inner-container {
  flex:1 1 70px;
  border: 1px solid black;
  margin: 1px;

}


</style>


