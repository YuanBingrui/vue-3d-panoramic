<template>
  <div class="home">
    <ThreeDshow></ThreeDshow>
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
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import "./home.less";
</style>
