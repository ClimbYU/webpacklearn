<template>
  <div id="root" class="container-content">search page</div>
</template>

<style scoped lang="less">
</style>

<script>
import { formate } from "../utils/utils.js";
import Home from "../index/home.vue";
export default {
  name: "Search",
  components:{Home},
  data() {
    return {
      name: "Vue"
    };
  },
  mounted() {
    formate();
  }
};
</script>

