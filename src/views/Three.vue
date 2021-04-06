<template>
  <div class="">
    <div id="stageWrapper">
      <div id="domContent">
        <canvas id="canvasContent" ></canvas>
      </div>

    </div>
  </div>
</template>

<script>

import * as THREE from '../lib/three.module.js';
import {OrbitControls} from '../lib/controls/OrbitControls.js';
import {TrackballControls} from '../lib/controls/TrackballControls.js';

export default {
  mounted() {
    let canvas, content,renderer;
    const scenes = [];


    // hard coded for now...

    let width='600px'
    let height='600px'
    let top='0px'
    let left='0px'

    init(top,left,width,height);

    animate();





    function init(top,left,width,height) {
      /*  the Main Canvas element
          scenes are a series of viewports of a single canvas

      */
      canvas = document.getElementById("canvasContent");
      content = document.getElementById('domContent');

      const geometries = [
        new THREE.BoxBufferGeometry(1, 1, 1),
        new THREE.SphereBufferGeometry(.7, 30, 15),
      ];

      function makeScenes(instanceParams,master) {

        /*  make instances of each Gimmick
            the Gimmick is a folder with

         config.json  - recipe for gimmick.
         index.js    - the startup script for this gimmick
         model folder
            <modelname>.gltf  - the model that represents the AVATAR of the object


        */

        for (let i = 0; i < instanceParams.length; i++) {
          const scene = new THREE.Scene();

          // Create div element to hold this Scene
          const inner = document.createElement('div');
          inner.className = 'inner-container';
          scene.userData.element = inner;
          content.appendChild(inner);

          // CAMERA
          const camera = new THREE.PerspectiveCamera(50, 1, 1, 10);
          camera.position.z = 2;
          scene.userData.camera = camera;

          // User Controls
          const controls = new OrbitControls(scene.userData.camera, scene.userData.element);
          controls.minDistance = 2;
          controls.maxDistance = 5;
          controls.enablePan = false;
          controls.enableZoom = true;
          scene.userData.controls = controls;


          // Some initial Geometries.
          // this will be the gltf import for the gimmick/scene

          const geometry = geometries[1];
          const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(.6, 1, 0.75),
            roughness: 0.5,
            metalness: 0,
            flatShading: true
          });
          scene.add(new THREE.Mesh(geometry, material));
          scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));

          const light = new THREE.DirectionalLight(0xffffff, 0.5);
          light.position.set(1, 1, 1);
          scene.add(light);


          // add to THE ARRAY OF SCENES
          scenes.push(scene);
        }
        return scenes;
      }


      // html templates for each scene (gimmick)
      let html_snip = [];

      // get all DOM elements that are in class 'sources'
      html_snip = document.getElementsByClassName('source')

      const instanceParams = [
        {width:250,height:250,a: 1, b: 'apples', o: html_snip[0]},            // make a reference to a visible object
        {width:250,height:250,a: 2, b: 'bananas', o: html_snip[1]},
        {width:250,height:250,a: 3, b: 'watermellon', o: html_snip[2]},
        {width:250,height:250,a: 4, b: 'lemons', o: html_snip[3]},
        {width:250,height:250,a: 5, b: 'persimmon', o: html_snip[5]},
        {width:250,height:250,a: 6, b: 'persimmon', o: html_snip[5]},
        {width:250,height:250,a: 7, b: 'persimmon', o: html_snip[5]},
        {width:250,height:250,a: 8, b: 'persimmon', o: html_snip[5]},
        {width:250,height:250,a: 9, b: 'persimmon', o: html_snip[5]},
        {width:250,height:250,a: 10, b: 'persimmon', o: html_snip[5]},
        {width:250,height:250,a: 4, b: 'lemons', o: html_snip[3]},
        {width:250,height:250,a: 5, b: 'persimmon', o: html_snip[5]},
        {width:250,height:250,a: 6, b: 'persimmon', o: html_snip[5]},
        {width:250,height:250,a: 7, b: 'persimmon', o: html_snip[5]},
        {width:250,height:250,a: 8, b: 'persimmon', o: html_snip[5]},
        {width:250,height:250,a: 9, b: 'persimmon', o: html_snip[5]},
        {width:250,height:250,a: 10, b: 'persimmon', o: html_snip[5]}
      ]

      let master={};

      // s holds the array of scenes
      let s = makeScenes( instanceParams,master);
      window.s=s

      renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true,alpha:true});
      renderer.setClearColor(0x444444, 0);
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
      renderer.setClearColor(0x222222, 0);
      renderer.setScissorTest(false);
      renderer.clear();
      renderer.setClearColor(0x222222, 0);
      renderer.setScissorTest(true);
      scenes.forEach(function (scene) {

        // get the element that is a place holder for where we want to

        const scene_element = scene.userData.element;
        const scene_wrapper_div = renderer.domElement

        const width = scene_element.offsetWidth
        const height = scene_element.offsetHeight
        const left = scene_element.offsetLeft
        const bottom = scene_wrapper_div.offsetHeight - (scene_element.offsetTop + scene_element.offsetHeight)


        renderer.setViewport(left, bottom, width, height);
        renderer.setScissor(left, bottom, width, height);

        const camera = scene.userData.camera;
        camera.aspect = width / height; // not changing in this example
        camera.updateProjectionMatrix();

        scene.userData.controls.update();
        renderer.render(scene, camera);
      });
    }
  }
}

</script>
<style>


#stageWrapper {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width:100%;
  height:100%;
  background-color: darkgray;
  border:1px solid black;
  box-sizing: border-box;
}

#domContent{
  flex:1 1 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: absolute;
  /*border:3px solid red;*/
  box-sizing: border-box;
  overflow: hidden;
  z-index: 1;


}
#canvasContent{
  position: absolute;
  width:100%;
  height:100%;
  /*border:2px solid blue;*/

}
.inner-container {
  flex:1 1 100px;
  width:100px;
  height:100px;
  border: 1px solid white;
  margin: 5px;
  z-index:20;


}

canvas{

}


</style>


