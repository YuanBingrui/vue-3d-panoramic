<template>
  <div
    id="threeDshowBox"
    data-content=""
    @mousedown.prevent="autoMobile"
    @mousewheel.prevent="wheelZoom"
    @mousemove.prevent="mouseMove"
    @mouseup.prevent="mouseUp"
    @touchstart.prevent="touchStart"
    @touchmove.prevent="touchMove">
  </div>
</template>

<script>
import * as THREE from 'three';
import ThreeRender from '@/3Dlibs/3DRenderer';

export default {
  name: 'ThreeDshow',
  props: {
    modeName: {
      type: String,
      default: '全景图'
    },
    cubeImg: {
      validator: (val) => val instanceof Array
    }
  },
  data () {
    return {}
  },
  watch: {
    cubeImg: function() {
      ThreeRender._main_(THREE, this);
    },
    modeName: function() {
      this.$el.dataset.content = this.modeName;
    }
  },
  mounted() {
    this.$el.dataset.content = this.modeName;
    ThreeRender._main_(THREE, this);
  },
  methods: {
    autoMobile(event){
      this.$emit('mousedown', event);
    },
    mouseMove(event){
      this.$emit('mousemove', event);
    },
    mouseUp(event){
      this.$emit('mouseup', event);
    },
    wheelZoom(event){
      this.$emit('wheel', event);
    },
    touchStart(event){
      this.$emit('touchstart', event);
    },
    touchMove(event){
      this.$emit('touchmove', event);
    }
  }
}
</script>

<style leng="less" scoped>
  @import "./ThreeDshow.less";
</style>
