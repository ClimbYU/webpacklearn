<style scoped lang='less' src="./index.less">
</style>
<template>
  <Table :data="tableData" style="width: 100%">
    <table-column prop="date" label="日期" width="150">
      <table-column label="配送信息">
        <table-column prop="name" label="姓名" width="120"></table-column>
        <table-column label="地址">
          <table-column prop="province" label="省份" width="120">
            <template slot-scope="scope">
              <slot name="province" :scope="scope"></slot>
            </template>
          </table-column>
          <table-column prop="city" label="市区" width="120"></table-column>
          <table-column prop="address" label="地址" width="300"></table-column>
          <table-column prop="zip" label="邮编" width="120">
            <template slot-scope="scope">
              <slot name="zip" :scope="scope"></slot>
            </template>
          </table-column>
        </table-column>
      </table-column>
      <table-column label="配送信息">
        <table-column prop="name" label="姓名" width="120"></table-column>
        <table-column label="地址"></table-column>
      </table-column>
    </table-column>
  </Table>
</template>
<script src="./index.js"></script>