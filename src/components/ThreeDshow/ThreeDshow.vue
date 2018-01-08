<template>
  <div id="ThreeDshowBox"></div>
</template>

<script>
import * as THREE from 'three';
import ThreeRender from '@/3Dlibs/3DRenderer';

export default {
  name: 'ThreeDshow',
  props: {
    cubeImg: {
      validator: (val) => val instanceof Array
    }
  },
  data () {
    return {
      
    }
  },
  created () {
    console.log(cubeImg)
  },
  mounted() {
    ThreeRender._main_(THREE);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style leng="less">
  @import "./ThreeDshow.less";
</style>
