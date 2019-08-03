<template>
  <div id="root" class="container-content">
    hello {{name}}
    <div class="image"></div>
  </div>
</template>

<style scoped lang="less">
.container {
  .container-content();
}
.container-content() {
  &-content {
    color: #1717cf;
    background: #31db0f;
    .image {
      background-image: url(./assets/images/timg.jpg);
      background-repeat: no-repeat;
      width: 150px;
      height: 50px;
      background-size: cover;
    }
  }
}
</style>

<script>
export default {
  name: "Hello",
  data() {
    return {
      name: "vue"
    };
  }
};
</script>

