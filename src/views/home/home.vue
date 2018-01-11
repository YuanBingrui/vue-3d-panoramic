<template>
  <div class="home">
    <div class="headerBtnBox">
      <el-button
        size="medium"
        @click="generatePanorama">
        生成全景图
      </el-button>
      <div style="color: #c1c1c1;margin-left: 5px; margin-right: 60%;">(ps: 上传图片的顺序为左、右、上、下、前、后)</div>
      <el-dropdown
        @command="switchMode">
        <el-button
          size="medium">
          {{modeName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <template
            v-for="mode in modeArr">
            <el-dropdown-item
              :command="mode.id">
              {{mode.name}}
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="contentBox">
      <div class="leftBox">
        <div class="titleFontSize">平面图</div>
        <div class="plainImgBox">
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
          <el-dialog
            :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>  
      </div>
      <div class="rightBox">
        <ThreeDshow
          :cube-img="cubeImg"
          :mode-name="modeName">
        </ThreeDshow>
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
      modeName: '3D全景',
      cubeImg: [
        '../../static/cube/posx.jpg', '../../static/cube/negx.jpg',
        '../../static/cube/posy.jpg', '../../static/cube/negy.jpg',
        '../../static/cube/posz.jpg', '../../static/cube/negz.jpg'
      ],
      modeArr: [ {id: '3DPanorama', name: '3D全景'}, {id: '3DPanorama1', name: '3D全景1'}, {id: '3DPanorama2', name: '3D全景2'}, {id: '3DPanorama3', name: '3D全景3'}],
      tempCubeImg: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      if(fileList[fileList.length-1].raw.type === 'image/jpeg' || fileList[fileList.length-1].raw.type === 'image/png'){
        this.tempCubeImg = fileList;
      }else{
        fileList.pop();
        this.$message.warning(`只能上传jpg或png格式的图片`);
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`只能上传${fileList.length}个文件`);
    },
    generatePanorama() {
      if(this.tempCubeImg.length === 6){
        this.tempCubeImg.forEach((value, index) => {
          this.$set(this.cubeImg, index, this.tempCubeImg[index].url); 
        })
      }else{
        this.$message.warning(`必须上传6张图片`);
      }
    },
    switchMode(command) {
      this.initMode(command)
    },
    initMode(command) {
      this.modeArr.map(one => {
        if(one.id === command){
          this.modeName = one.name;
        }
      })
    }
  }
}
</script>

<style lang="less">
  @import "./home.less";
</style>
