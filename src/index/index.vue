<template>
  <div>
    <div class="test-1"></div>
    this is test
    <div class="test-2"></div>
  </div>
</template>

<style lang="less">
    .test{
      .test();
      .test-1();
      .test-2();
    }
    .test(){}

    .test-1(){
      &-1{
        background:url('../assets/sprites/group2/share-9.png') no-repeat;
        width:44px;
        height:42px
      }
    }
    
    .test-2(){
      &-2{
        background:url('../assets/sprites/group2/share-11.png') no-repeat;
        width:122px;
        height:23px
      }
    }
</style>