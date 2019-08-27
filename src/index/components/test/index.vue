<style scoped lang='less' src="./index.less">
</style>
<template>
  <div>
    <!-- 测试inheritAttrs属性 -->
    <!-- <div>{{child1}}</div>
    <div>{{$attrs.child2}}</div>-->
    {{ label }}
    <label>
      <input v-bind="$attrs" v-bind:value="inputValue" v-on="inputListeners" />
    </label>
  </div>
</template>
<script src="./index.js"></script>