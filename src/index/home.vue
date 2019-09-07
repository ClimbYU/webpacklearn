<template>
  <div class="container-content">
    Hello {{name}}
    <div class="image"></div>
    <div class="box"></div>
    <!-- <img src="./assets/images/image.jpg" /> -->
    <Button type="primary" @click="next">next</Button>
  </div>
</template>

<style scoped lang="less">
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

