<template>
  <div class="homeWrap">
    <div class="page-header">
      <div class="page-title">
        Bảng chính
      </div>
    </div>
    <div class="main-content">
      <List v-for="(list, index) in lists" :key="index" :list="list" />
      <div class="listWrap" ref="addListBtn" @click="createListForm()">
        <i class="el-icon-plus"></i>
        Thêm danh sách khác
      </div>
      <div class="listWrap" id="addWrap" ref="addListWrap">
        <el-input placeholder="Nhập tiêu đề danh sách..." v-model="listName"></el-input>
        <el-button type="success" class="add-list" @click="createList">Thêm danh sách</el-button>
        <i class="el-icon-close close-add-list" @click="cancelCreateList()"></i>
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/List";
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Home',
  components: {
    List
  },
  data () {
    return {
      dynamicValidateForm: {
        listName: ''
      },
      listName: '',
      newList: []
    }
  },
  computed: {
    ...mapState('home', [
        'lists'
    ])
  },
  methods: {
    ...mapMutations('home', [
       'addList'
    ]),
    createListForm() {
      this.$refs.addListBtn.style.display = 'none'
      this.$refs.addListWrap.style.display = 'block'
    },
    cancelCreateList() {
      this.$refs.addListBtn.style.display = 'block'
      this.$refs.addListWrap.style.display = 'none'
      this.listName = ''
    },
    createList() {
      if (this.listName != '')
      {
        this.newList.push(this.lists.length + 1)
        this.newList.push(this.listName)
        this.addList(this.newList)
        this.cancelCreateList()
        this.newList = []
      }
    }
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
      .listWrap {
        padding: 10px 8px;
        text-align: left;
        background: rgba(220 203 211 / 47%);
        border-radius: 4px;
        width: 272px;
        box-sizing: border-box;
        color: #ffffff;
        float: left;
        margin-right: 15px;
        cursor: pointer;
      }
      #addWrap {
        background: #ffffff !important;
        color: #5e6c84;
        display: none;
        .add-list {
          padding: 7px 10px;
          margin: 4px 10px 0 0;
        }
        .close-add-list {
          font-size: 16px;
        }
      }
    }
  }
</style>
