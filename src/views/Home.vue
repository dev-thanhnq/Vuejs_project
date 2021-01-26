<template>
  <div class="homeWrap">
    <div class="page-header">
      <div class="page-title">
        Bảng chính
      </div>
    </div>
    <div class="main-content">
      <List/>
    </div>
  </div>
</template>

<script>
import List from "@/components/List";
export default {
  name: 'Home',
  components: {
    List
  }
}
</script>

<style lang="scss" scoped>
  .homeWrap {
    height: 95vh;
    .page-header {
      height: auto;
      overflow: hidden;
      .page-title {
        margin: 7px;
        padding: 7px;
        float: left;
        background: rgba(220 203 211 / 47%);
        color: #ffffff;
        border-radius: 4px;
        cursor: pointer;
      }
    }
    .main-content {
      margin: 0 7px;
    }
  }
</style>
