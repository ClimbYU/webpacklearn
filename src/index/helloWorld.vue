<template>
  <div id="root" class="container-content">
    <!-- Hello {{name}}
    <div class="image"></div>
    <div class="box" @click="importComponent"></div>-->
    <!-- <Test
      :label="pChild1"
      :child2="pChild2"
      :input-value="value"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @click="handleClick"
    >
      <template slot="test1" slot-scope="scope">
        <div>{{scope.user.name}}</div>
      </template>
      <template v-slot:test2="scope">
        <div>{{scope.message.age}}</div>
      </template>
      <template #test3="{other}">
        <div>{{other.date}}</div>
      </template>
      <template slot="slot1">
        <div>slot1</div>
      </template>
    </Test>-->
    <!-- <Home></Home> -->
    <Button type="primary">按钮</Button>
    <Table :tableData="tableData">
      <template v-slot:province="{scope}">
        <div style="display:flex">
          <!-- <div style="display:flex;flex-wrap:nowrap">{{scope.row.province}}</div> -->
          <div>{{scope.row.province}}</div>
          <div>
            <i class="el-icon-bottom" style="color:red">+34.3%</i>
            <i class="el-icon-top" style="color:green">-34.2%</i>
          </div>
        </div>
      </template>
      <template v-slot:zip="{scope}">
        <div>
          <!-- <div style="display:flex;flex-wrap:nowrap">{{scope.row.province}}</div> -->
          <div>{{scope.row.zip}}</div>
          <i class="el-icon-top" style="color:green">-34.2%</i>
        </div>
      </template>
    </Table>
  </div>
</template>

<script>
import { Button } from "element-ui";
import "./assets/css/index.css";
import { formate, getData } from "../utils/utils.js";
import Home from "./home.vue";
import Test from "./components/test/index.vue";
import Table from "./components/table/index.vue";
export default {
  name: "Hello",
  components: { Home, Test, Button, Table },
  data() {
    return {
      name: "Vue",
      home: "",
      pChild1: "传递给子组件的属性",
      pChild2: "未被继承的属性",
      value: "test",
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  methods: {
    importComponent() {
      import("./home.vue").then(home => {
        console.log(home);
        this.home = home.default;
      });
    },
    handleFocus(e) {
      console.log("handleFocus", e);
    },
    handleBlur(e) {
      console.log("handleBlur", e);
    },
    handleInput(e) {
      console.log("handleInput", e);
    },
    handleClick(e) {
      console.log("handleClick", e);
    }
  },
  mounted() {
    getData();
    formate();
  }
};
</script>

<style scoped lang="less">
.container {
  .container-content();
}
.container-content() {
  &-content {
    display: flex;
    color: #1717cf;
    font-size: 30px;
    // font-family: "SourceHanSerifSC-Heavy";
    .image {
      background-image: url(./assets/images/timg.jpg);
      background-repeat: no-repeat;
      width: 150px;
      height: 50px;
      background-size: cover;
    }
    .box {
      border-radius: 5px;
      width: 150px;
      height: 150px;
      box-shadow: 2px 3px 5px #0dccb2;
    }
  }
}
</style>