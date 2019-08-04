<template>
  <div id="root" class="container-content">search page</div>
</template>

<style scoped lang="less">
</style>

<script>
import { formate } from "../utils/utils.js";
export default {
  name: "Search",
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

