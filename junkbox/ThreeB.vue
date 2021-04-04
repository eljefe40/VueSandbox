<template>
  <div class="about pa-6">
    <div id="ui">
      <div id="A1">
      </div>
      <div id="A2">
      </div>
    </div>
  </div>
</template>

<script>

import {Stage} from './Stage'

export default {
  mounted() {

    function initStage(containerId) {
      let stage = new Stage(containerId);

      render();

      function render() {


        for(let s=0;s<stage.scenes.length;s++) {
        //  stage.scenes[s].orbit.update();
          stage.renderer.render(stage.scenes[s], stage.scenes[s].camera);
        }

        requestAnimationFrame(render);
      }

      window.onresize = function () {
        stage.resize()
      };
      return stage
    }

    let stage=initStage("A1");
    stage.resize();
  }

}

</script>
<style>


#ui {
  padding:0;
  margin:0;
  height: 30vh;
  width:30vw;
  /*border: 3px solid #fa0303;*/
  /*box-sizing: border-box;*/
}


#A1 {
  margin:0;
  padding:0;
  width:100%;
  height:100%;
  border: 3px solid #d00f08;
  box-sizing: border-box;
}
#A2 {
  margin:0;
  padding:0;
  width:100%;
  height:100%;
  border: 3px solid #0823d0;
  box-sizing: border-box;
}

</style>


