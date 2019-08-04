<template>
  <div id="root" class="container-content">
    Hello {{name}}
    <div class="image"></div>
    <div class="box" @click="importComponent"></div>
    {{home}}
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
      background-image: url(./assets/images/timg.jpg);
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
  }
}
</style>

<script>
import "./assets/css/index.css";
import { formate, getData } from "../utils/utils.js";
import Home from "./home.vue";
export default {
  name: "Hello",
  // components: [Home],
  data() {
    return {
      name: "Vue",
      home: ""
    };
  },
  methods: {
    importComponent() {
      import("./home.vue").then(home => {
        console.log(home);
        this.home = home.default;
      });
    }
  },
  mounted() {
    getData();
    formate();
  }
};
</script>

