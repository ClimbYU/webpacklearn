<template>
  <div class="container">
    <div class="content">
      <div class="content-item">
        <div class="content-item-hai">
          <div class="hai-container">
            <span>海淘</span>
            <div class="hai-image"></div>
          </div>
          <div class="div-image"></div>
        </div>
        <div class="content-item-hai">
          <div class="hai-container">
            <span>海淘</span>
            <div class="hai-image"></div>
          </div>
          <div class="div-image"></div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-hai">
          <div class="hai-container">
            <span>海淘</span>
            <div class="hai-image"></div>
          </div>
          <div class="div-image"></div>
        </div>
        <div class="content-item-hai">
          <div class="hai-container">
            <span>海淘</span>
            <div class="hai-image"></div>
          </div>
          <div class="div-image"></div>
        </div>
      </div>
    </div>
    <div class="header">
      <span id="span">测试字体</span>
      <p id="p">测试段落</p>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  width: 750px;
  background-color: aquamarine;
}

.header span {
  font-size: 30px;
}

.header p {
  font-size: 35px;
}

.content {
  display: flex;
  flex-direction: column;
}

.content-item {
  display: flex;
}

.content-item div {
  display: flex;
}

.content-item-hai {
  width: 375px;
}

.div-image {
  background: url("./assets/images/image.jpg") no-repeat;
  width: 300px;
  height: 300px;
  background-size: contain;
}

.hai-container {
  display: flex;
  flex-direction: column;
  width: 135px;
}

.hai-container span {
  font-size: 25px;
}

.hai-image {
  background: url("./assets/images/image.jpg") no-repeat;
  width: 75px;
  height: 200px;
  background-size: contain;
}
</style>

<script>
import { Button } from "element-ui";
import "./assets/css/index.css";
import { formate } from "../utils/utils.js";
export default {
  components: { Button },
  name: "Home",
  data() {
    return {
      name: "home"
    };
  },
  methods: {
    next() {
      this.$router.push("/hello");
    }
  },
  mounted() {
    console.log("home");
    formate();
  }
};
</script>

