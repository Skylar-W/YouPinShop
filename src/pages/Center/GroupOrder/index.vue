<template>
  <div class="group">
    <h3>团购订单</h3>
    <img src="../images/wine1.jpg" alt="" />
    <img src="../images/wine2.jpg" alt="" />
    <img src="../images/itemlike04.png" alt="" />
    <img src="../images/itemlike02.png" alt="" />
    <img src="../images/itemlike03.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "GroupOrder",
};
</script>

<style lang="less" scoped>
  .group {
    float: right;
    width: 83.33%;
    h3 {
      background-color: #f3f3f3;
      padding: 16px;
    }
    img {
      vertical-align: middle;
      margin-left: 50px;
      margin-top: 60px;
      border: 1px solid grey;
    }
  }
</style>