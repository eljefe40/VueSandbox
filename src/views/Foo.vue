<template>
  <div class="about pa-6">

    <div id="ui">
    <div class="loading">
      <h1>Drag a song here</h1>
    </div>
    <div id="drag">
      <h2 id="songname">Drag a song here</h2>
    </div>
    <div id="content">

    </div>
    </div>
  </div>
</template>



<script>

import * as THREE from '../lib/three.module.js';
import {TrackballControls} from '../lib/controls/TrackballControls.js';


export default {
  mounted() {
    THREE.TrackballControls=TrackballControls;

//      256/3.5      32/22

    let fft=32;
    let colorWheelMultiplier=22
    let divisor=170

//Default colors
    let defaultColors = [
      {pct: 0, color: {r: 0xf4, g: 0xee, b: 0x42}},
      {pct: 0.5, color: {r: 0x41, g: 0xf4, b: 0x68}},
      {pct: 1, color: {r: 0x41, g: 0xdf, b: 0xf4}}
    ];

//Random number generator with +/-
    function random(min, max, sign) {

      let rn = Math.floor((Math.random() * max) + min);

      if (sign)
        rn *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

      return rn;

    };

    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    class AudioBars {

      update() {
        let spectrum = this.analyser.getFrequencyData();
        spectrum.forEach((sound, i) => {
          let height = this.scale * sound;
          //let w = Math.sin((sound / 255) * (Math.PI / 2)) * 255;
          let w = (sound*sound)/divisor;
          this.Bars[i].style.height = w + 'px';
          //this.Bars[i].style.display = sound > 0 || spectrum[i+1] > 0 || spectrum[i-1] > 0 ? 'block' : 'none';
          this.Bars[i].style.backgroundColor='hsl('+i*colorWheelMultiplier+', 100%, 50%)';
        });
      }

      color(pct) {
        for (var i = 1; i < this.colorRange.length - 1; i++) {
          if (pct < this.colorRange[i].pct) {
            break;
          }
        }
        let lower = this.colorRange[i - 1];
        let upper = this.colorRange[i];
        let range = upper.pct - lower.pct;
        let rangePct = (pct - lower.pct) / range;
        let pctLower = 1 - rangePct;
        let pctUpper = rangePct;
        let color = {
          r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
          g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
          b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        return '#' + componentToHex(color.r) + componentToHex(color.g) + componentToHex(color.b);
      }

      constructor(analyser, options) {

        this.analyser = analyser;
        this.length = analyser.data.length;
        this.Dom = document.createElement('div');
        this.Dom.classList.add('bar-container');
        this.Bars = [];
        this.scale = options.scale || 1;
        this.colorRange = false || options.colorRange;

        for (let i = 0; i < this.length; i++) {
          let bar = document.createElement('div');
          bar.classList.add('bar');
          this.Dom.appendChild(bar);
          this.Bars.push(bar);
        }

      }
    }

    let renderer, camera, controls, scene, listener, sound, audioLoader, content, draggable, songTitle, blobURL, playing,
        analyser;

    function load_song(file) {

      let songname = file.name;
      let url = window.URL.createObjectURL(file);
      blobURL = url;

      audioLoader.load(url, (buffer) => {
        //initial audio load function
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(1);
        if (playing) {
          sound.stop();
        }
        sound.play();
        playing = true;
        songTitle.innerHTML = songname;

      }, (xhr) => {
        //load progress function
        let perc = (xhr.loaded / xhr.total * 100);
        let loaded = 'Loading ' + songname + ': ' + Math.floor(perc) + '%';
        console.log(loaded)
        songTitle.innerHTML = loaded;

      }, (err) => {
        //Error function

        songTitle.innerHTML = 'Failed to load: ' + songname;
        console.log(err)

      });

    }

    function init() {
      content = document.getElementById('content');
      draggable = document.getElementById('drag');
      songTitle = document.getElementById('songname');
      renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      camera = new THREE.PerspectiveCamera(125, window.innerWidth / window.innerHeight, 1, 2000);
      controls = new THREE.TrackballControls(camera, renderer.domElement);
      camera.position.z = 500;
      //camera.position.x = 200;
      camera.zoom=14;
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0026);
      listener = new THREE.AudioListener();
      camera.add(listener);
      sound = new THREE.Audio(listener);
      sound.setVolume(1);
      audioLoader = new THREE.AudioLoader();
      analyser = new THREE.AudioAnalyser(sound, fft);

      content.append(renderer.domElement);
      document.getElementsByClassName('loading')[0].remove();

    }

    function animate() {
      box.rotation.x += 0.01;
      box.rotation.y += 0.01;
      controls.update();
      if (playing) {
        let s = analyser.getAverageFrequency() / 80;
        AudioSpectrum.update();
        box.scale.set(s, s, s)
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    init();

    window.addEventListener('resize', function () {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    let g = new THREE.CubeGeometry(200, 200, 200);
    let m = new THREE.MeshNormalMaterial();
    let box = new THREE.Mesh(g, m);
    scene.add(box);
     box.position.x=-160
    box.position.y=250
    box.position.z=-150

    draggable.addEventListener('drop', (e) => {
      e.preventDefault();

      let files = e.target.files || e.dataTransfer.files;

      load_song(files[0]);
    });

    draggable.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    draggable.addEventListener('dragend', (e) => {
      e.preventDefault();
    });

    let AudioSpectrum = new AudioBars(analyser, {
      scale: 0.6,
      colorRange: defaultColors
    });

    content.appendChild(AudioSpectrum.Dom);

    animate();
  }
}

</script>
<style>

#ui{
  position:absolute;
  display:flex;
  flex-direction: column;
  width:100%;
  /*//height:300px;*/
  bottom:0px;
  /*border:1px solid red;*/
  box-sizing: border-box;
  top: 0px;
  left: 0px;
  overflow:hidden;
}

#content{
  flex:1;
  left:0;
  top:0;
}

canvas {
  flex:1;
}

#drag {
  width: 100%;
  height: 40px;
  position: absolute;
  color: #f0f604;
  text-align: center;
  font-family: sans-serif;
  border:1px solid yellow;
  z-index: 1;
}

.bar{
 margin-right:3px;

}
.bar-container {
  position: fixed;
  bottom: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  transform: rotatex(180deg);
}
.bar-container .bar {
  flex:2;
}

.loading {
  position: absolute;
  background-color: blue;
  width: 400px;
  height: 200px;
  z-index: 1;
}
.loading h1 {
  font-family: sans-serif;
  color: white;
  text-align: center;
  /*padding-top: 40vh;*/
}
</style>
