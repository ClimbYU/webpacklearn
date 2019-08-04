<template>
  <div id="root" class="container-content">
    Hello {{name}}
    <div class="image"></div>
    <div class="box"></div>
  </div>
</template>

<style scoped lang="less">
</style>

<script>
import "./assets/css/index.css";
import { formate } from "../utils/utils.js";
export default {
  name: "Home",
  data() {
    return {
      name: "home"
    };
  },
  mounted() {
    console.log("home");
    formate();
  }
};
</script>

