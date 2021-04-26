<template>
  <div class="myLive">
    <div class="top_button">
      <!--开启摄像头-->
      <Button
        v-if="isCameraFlag"
        type="primary"
        ghost
        @click="callCamera"
        style="margin-right: 10px"
      >开启摄像头</Button
      >
      <!--关闭摄像头-->
      <Button
        v-else
        type="danger"
        ghost
        @click="closeCamera"
        style="margin-right: 10px"
      >关闭摄像头</Button
      >
      <!--拍照-->
      <Button type="primary" @click="photograph"
      ><a-icon type="camera"
      /></Button>
    </div>
    <!--图片展示-->
    <video
      ref="video"
      width="500"
      height="376"
      autoplay
      class="mt20"
      style="background: #d9d9d9"
    ></video>
    <!--canvas截取流-->
    <canvas ref="canvas" width="300" height="200"></canvas>
  </div>
</template>
<script>
export default {
  name: "myLive",
  data() {
    return {
      isCameraFlag: true,
    };
  },
  methods: {
    // 调用摄像头
    callCamera() {
      // H5调用电脑摄像头API
      navigator.mediaDevices
        .getUserMedia({
          audio: true,  //开启音频
          video: true,  //开启视频
        })
        .then((success) => {
          var videoTracks = success.getVideoTracks();
          console.log(success);
          console.log(videoTracks);
          // 摄像头开启成功
          this.$refs["video"].srcObject = success;
          this.isCameraFlag = false;
          // 实时拍照效果
          this.$refs["video"].play()
        })
        .catch((error) => {
          console.error("摄像头开启失败，请检查摄像头是否可用！");
          this.isCameraFlag = true;
        });
    },
    // 拍照
    photograph() {
      // 把当前视频帧内容渲染到canvas上
      let ctx = this.$refs["canvas"].getContext("2d");
      ctx.drawImage(this.$refs["video"], 0, 0, 640, 480);
      /**------------后面是下载功能----------*/
      // 转base64格式、图片格式转换、图片质量压缩---支持两种格式image/jpeg+image/png
      //let imgBase64 = this.$refs["canvas"].toDataURL("image/jpeg", 0.7);
      // 由字节转换为KB 判断大小
      // let str = imgBase64.replace("data:image/jpeg;base64,", "");
      // let strLength = str.length;
      // let fileLength = parseInt(strLength - (strLength / 8) * 2); // 图片尺寸  用于判断
      // let size = (fileLength / 1024).toFixed(2);
      // console.log(size); // 上传拍照信息  调用接口上传图片 .........
      // 保存到本地
      // let ADOM = document.createElement("a");
      // ADOM.href = this.headImgSrc;
      // ADOM.download = new Date().getTime() + ".jpeg";
      // ADOM.click();
    },
    // 关闭摄像头
    closeCamera() {
      if (!this.$refs["video"].srcObject) return;
      let stream = this.$refs["video"].srcObject;
      let tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      this.$refs["video"].srcObject = null;
      this.isCameraFlag = true;
    },
  },
};
</script>
