<template>
  <div>
    <div class="listWrap">
      Thêm mới danh sách
    </div>
    <div class="listWrap" id="list2">

    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  components: {

  }
}
</script>

<style lang="scss" scoped>
  .listWrap {
    padding: 6px 8px;
    text-align: left;
    background: rgba(220 203 211 / 47%);
    border-radius: 4px;
    width: 272px;
    box-sizing: border-box;
    color: #ffffff;
    float: left;
    margin-right: 15px;
  }
  #list2 {
    height: 300px;
    background: #0080dd;
  }
</style>