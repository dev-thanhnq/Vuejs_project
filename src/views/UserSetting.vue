<template>
  <div class="profileWrap">
    <div class="page-header">
      <div class="page-title">
        Thông tin tài khoản
      </div>
    </div>
    <div class="main-content">
      <div class="user-profile">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  }
}
</script>

<style lang="scss" scoped>
.profileWrap {
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
    .user-profile {
      width: 900px;
      height: 400px;
      background: #d4d7da;
    }
  }
}
</style>
