<style src="./index.less"></style>
<script src="./index.js"></script>
<template>
  <div class="home">
    <div class="container display-flex flex-col">
      <div class="container-title display-flex flex-col-center flex-row-around">
        <div>取消</div>
        <div>请选择</div>
        <div>确定</div>
      </div>
      {{selectedIndex}}
      <div @touchstart="selectStart" @touchmove="selectMove" @touchend="selectEnd"
        class="content-box display-flex flex-row-center">
        <div class="content-box-top"></div>
        <ul ref="select_content" class="select-content" :style="`transform:translate(0,${scrollLocation}px)`">
          <li :ref="`liList${index}`" v-for="(item,index) in contentList" :key="index">{{item}}--{{index}}</li>
        </ul>
        <div class="content-box-bottom"></div>
      </div>
    </div>
  </div>
</template>