<template>
  <div class="home">
    <div class="contentBox">
      <div class="leftBox titleFontSize">平面图</div>
      <div class="rightBox titleFontSize">3D全景</div>
    </div>
    <div class="contentBox">
      <div class="leftBox plainImgBox">
        <el-upload
          action=""
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :auto-upload="false"
          :limit="6"
          :on-exceed="handleExceed"
          class="upload-card">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <div class="rightBox">
        <ThreeDshow :cubeImg="cubeImg"></ThreeDshow>
      </div>
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
      dialogImageUrl: '',
      dialogVisible: false,
      cubeImg: [
        '../../static/cube/posx.jpg', '../../static/cube/negx.jpg',
        '../../static/cube/posy.jpg', '../../static/cube/negy.jpg',
        '../../static/cube/posz.jpg', '../../static/cube/negz.jpg'
      ]
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file)
      console.log(fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      if(fileList.length === 6){
        this.cubeImg.forEach((value, index) => {
          this.cubeImg[index] = fileList[index].url
        })
      }
      console.log(this.cubeImg)
      console.log(fileList)
    },
    handleExceed(files, fileList){
      this.$message.warning(`只能上传${fileList.length}个文件`);
    }
  }
}
</script>

<style lang="less">
  @import "./home.less";
</style>
