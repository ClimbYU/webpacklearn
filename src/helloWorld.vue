<template>
  <div id="root" class="container-content">
    Hello {{name}} zhue
        <div class="image"></div>
    <div class="box"></div>
    <div class="image-1"></div>
    <div class="image-2"></div>
    <Index></Index>
  </div>
</template>

<style scoped lang="less">
.container {
  .container-content();
}
.container-content() {
  &-content {
    display: flex;
    color: #1717cf;
    font-size: 30px;
    // font-family: "SourceHanSerifSC-Heavy";
    .image {
      background-image: url(./assets/images/test4.png);
      background-repeat: no-repeat;
      width: 150px;
      height: 50px;
      background-size: cover;
    }
    .box {
      border-radius: 5px;
      width: 150px;
      height: 150px;
      box-shadow: 2px 3px 5px #0dccb2;
    }
    .image-1{
      width:70px;
      height:253px;
      background:url('./assets/sprites/group1/share-7.png') no-repeat
    }
    .image-2{
      width:585px;
      height:89px;
      background:url('./assets/sprites/group1/share-8.png') no-repeat
    }
  }
}
</style>

<script>
// import "./assets/css/index.css";
import Index from './index/index.vue'
export default {
  name: "Hello",
  components:{Index},
  data() {
    return {
      name: "Vue"
    };
  }
};
</script>

