<template>
  <div class="pagination">
    <!-- 起始部分 -->
    <button :disabled="pageNo==1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <button
      v-if="showStart2End > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="showStart2End.start > 2">···</button>
    
    <!-- 中间展示部分 -->
    <button 
      v-for="(page, index) in showStart2End.end" :key="index"
      v-if="page >= showStart2End.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- 结尾展示部分 -->
    <button v-if="showStart2End.end < totalPage - 1">···</button>
    <button 
    v-if="showStart2End.end < totalPage"
    @click="$emit('getPageNo', totalPage)"
    :class="{active:pageNo==totalPage}"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    //总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    //计算当前展示的哪几页
    showStart2End() {
      const { pageNo, totalPage, continues } = this
      let start = 1, end = 1
      if(totalPage < continues) {//总页数 < 5
        end = totalPage
      } else {
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        if(start < 1) {//考虑:点击的页数序号小于5时,点击分页器可能使start < 0
          start = 1
          end = continues
        }
        if(end > totalPage) {//考虑:点击的页数命中末页邻近的5个时,点击分页器可能使end < totalPage
          start = totalPage - continues + 1
          end = totalPage
        }
      }
      return {start, end}
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #f62;
      color: #fff;
    }
  }
}
</style>