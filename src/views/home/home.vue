<template>
  <div class="home">
    <div class="plainImgBox">
      
    </div>
    <div class="panoramaBox">
      <ThreeDshow :cubeImg="cubeImg"></ThreeDshow>
    </div>
  </div>
</template>

<script>
import ThreeDshow from '@/components/ThreeDshow/ThreeDshow'
export default {
  name: 'Home',
  components: {
    ThreeDshow
  },
  data () {
    return {
      cubeImg: [
        '../../static/cube/posx.jpg', '../../static/cube/negx.jpg',
        '../../static/cube/posy.jpg', '../../static/cube/negy.jpg',
        '../../static/cube/posz.jpg', '../../static/cube/negz.jpg'
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import "./home.less";
</style>
