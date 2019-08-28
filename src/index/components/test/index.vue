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
    <slot name="test1" :user="user"></slot>
    <slot name="test2" :message="message"></slot>
    <slot name="test3" :other="other"></slot>
    <div v-for="item in dataList" :key="item.name">
      <slot :name="item.name"></slot>
    </div>
  </div>
</template>
<script src="./index.js"></script>