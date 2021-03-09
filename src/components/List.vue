<template>
  <div>
    <el-dialog
        :visible.sync="dialogVisible"
        width="40%"
        style="text-align: left;"
        >
      <el-row>
        <el-col :span="18">
          <div class="detail-card-header">
            <i class="el-icon-bank-card"></i>
            <input type="text" v-model="card.title" class="detail-card-title" @keydown.enter="updateCardName">

          </div>
          <el-row style="" class="card-info">
            <el-col :span="2" style="font-size: 20px">
              <i class="el-icon-tickets"></i>
            </el-col>
            <el-col :span="22" style="padding-right: 18px">
              <div class="card-info-title">
                Mô tả
                <el-button size="small" style="padding: 5px 10px; margin-left: 5px" @click="openEditCardDescription" plain>Chỉnh sửa</el-button>
              </div>
              <div v-if="card.description" class="card-description">
                {{ card.description }}
              </div>
              <div v-else class="add-card-description" ref="cardDescriptionBtn" @click="openEditCardDescription">
                Thêm mổ tả chi tiết...
              </div>
              <textarea v-if="card.description" ref="cardDescription" v-model="card.description" class="add-card-description-textarea"
                        @blur="updateCardDescription"></textarea>
              <textarea v-else ref="cardDescription" v-model="card.description" placeholder="Thêm mổ tả chi tiết..." class="add-card-description-textarea"
                        @blur="updateCardDescription"></textarea>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="card-info">
          <div style="margin-bottom: 7px">THÊM VÀO THẺ</div>
          <div class="card-action-btn">
            <i class="el-icon-collection-tag" style="margin-right: 7px"> </i>
            Nhãn
          </div>
          <div class="card-action-btn">
            <i class="el-icon-s-claim" style="margin-right: 7px"> </i>
            Việc cần làm
          </div>
          <div class="card-action-btn">
            <i class="el-icon-time" style="margin-right: 7px"> </i>
            Ngày hết hạn
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <div class="listWrap" id="list2">
      <div class="list-header">
        <input type="text" class="list-name" v-model="directoryName" ref="directoryName"
               @click="handleEditName"
               @blur="cancelEditName"
               @keydown.enter="updateDirectoryName"
        >
        <el-button class="list-more-action" size="mini" style="border: 0; background-color: #ebecf0">
          <i class="el-icon-close" @click="deleteList"></i>
        </el-button>
      </div>
      <draggable class="drag-cards"
                 :list="directory.cards"
                 group="card"
      >
        <div class="card" ref="card" v-for="(card, index) in directory.cards" :key="index">
          <div shadow="hover" body-style="padding: 0 0 0 10px" class="card-content" @click="openDetailCard(card)">
            {{card.title}}
          </div>
        </div>
      </draggable>
      <div class="btn-add-card" ref="btnAddCard">
        <el-button type="info" size="small" class="add-card" @click="addCard()">
          <i class="el-icon-plus"></i>
          Thêm thẻ mới
        </el-button>
      </div>
      <div class="form-add-card" ref="formAddCard">
        <el-input placeholder="Nhập tiêu đề cho thẻ này..." v-model="cardName"></el-input>
        <el-button type="success" size="small" @click="storeCard">Thêm thẻ</el-button>
        <i class="el-icon-close" @click="cancelAddCard()"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import api from '../api'
import draggable from 'vuedraggable'

export default {
  props: ['directory'],
  name: "Directory",
  components: {
    draggable
  },
  computed: {
    ...mapState('home', [
        'cards'
    ]),
    getCardsByListId () {
      return this.cards.filter(card => card.directory_id === this.directory.id)
    }
  },
  data () {
    return {
      directoryName: this.directory.title,
      cardName: '',
      newCard: [],
      dialogVisible: false,
      a: 'abc',
      card: []
    }
  },
  methods: {
    ...mapMutations('home', [
      'addNewCard', 'removeList'
    ]),
    handleEditName() {
      this.$refs.directoryName.style.background = '#ffffff'
    },
    cancelEditName() {
      this.$refs.directoryName.style.background = '#ebecf0'
    },
    updateDirectoryName() {
      let data = {
        title: this.directoryName
      }
      api.editDirectoryName(this.directory.id, data).then(() => {
        this.$message({
          message: 'cập nhật danh sách thành công!',
          type: 'success'
        });
        this.reloadDirectories()
        this.cancelEditName()
      }).catch(() => {
        this.$message({
          message: 'cập nhật danh sách thành công!',
          type: 'error'
        });
      })
    },
    saveName() {

    },
    addCard() {
      this.$refs.btnAddCard.style.display = 'none'
      this.$refs.formAddCard.style.display = 'block'
    },
    cancelAddCard() {
      this.$refs.btnAddCard.style.display = 'block'
      this.$refs.formAddCard.style.display = 'none'
      this.cardName = ''
    },
    deleteList() {
      this.$confirm('Bạn có chắc chắn muốn xóa không?', 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        confirmButtonClass: 'btn-delete-list',
        type: 'warning'
      }).then(() => {
        api.deleteDirectory(this.directory.id).then(() => {
          this.$message({
            message: 'Xóa danh sách thành công!',
            type: 'success'
          });
          this.reloadDirectories()
        }).catch(() => {
          this.$message({
            message: 'Xóa danh sách thất bại!',
            type: 'error'
          });
        })
      }).catch(() => {})
    },
    storeCard() {
      let data = {
        title: this.cardName,
        index: this.directory.cards.length + 1,
        directory_id: this.directory.id
      }
      api.createCard(data).then(() => {
        this.$message({
          message: 'Thêm thẻ thành công!',
          type: 'success'
        });
        this.reloadDirectories()
        this.cancelAddCard()
      }).catch(() => {
        this.$message({
          message: 'Thêm thẻ không thành công!',
          type: 'error'
        });
        this.cancelAddCard()
      })
    },
    openDetailCard(card) {
      this.card = card
      console.log(card)
      this.dialogVisible = true
    },
    updateCardName() {
      let data = {
        title: this.card.title
      }
      api.editCard(this.card.id, data).then(() => {
        this.$message({
          message: 'Thành công!',
          type: 'success'
        });
      })
    },
    openEditCardDescription() {
      this.$refs.cardDescription.style.display = 'block'
      this.$refs.cardDescriptionBtn.style.display = 'none'
    },
    updateCardDescription() {
      let data = {
        description: this.card.description
      }
      api.editCard(this.card.id, data).then(() => {
        this.$message({
          message: 'Thành công!',
          type: 'success'
        });
        this.$refs.cardDescription.style.display = 'none'
        this.$refs.cardDescriptionBtn.style.display = 'block'
      })
    },
    reloadDirectories() {
      this.$emit('reloadDirectories')
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
  .detail-card-header {
    width: 95%;
    position: absolute;
    top: -40px;
    font-size: 20px;
    .detail-card-title {
      margin-left: 15px;
      font-size: 20px;
      border: none;
      height: 30px;
      width: 90%;
    }
  }
  .card-info {
    margin-top: 20px;
    .card-info-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 18px;
    }
    .card-description {
      width: 100%;
      max-height: 100px;
      overflow: auto;
      box-sizing: border-box;
    }
    .add-card-description {
      width: 100%;
      height: 56px;
      padding: 10px;
      box-sizing: border-box;
      background-color: rgba(9,30,66,.04);
      cursor: pointer;
      border-radius: 3px;
    }
    .add-card-description:hover {
      background-color: rgb(22 23 25 / 12%);
    }
    .add-card-description-textarea {
      width: 100%;
      height: 100px;
      padding: 10px;
      box-sizing: border-box;
      font-family: Arial;
      font-size: 14px;
      display: none;
    }
  }
  .card-action-btn {
    width: 100%;
    height: 32px;
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding-left: 7px;
    background-color: rgba(9,30,66,.04);
    margin-bottom: 7px;
    cursor: pointer;
  }
  .card-action-btn:hover {
    background-color: rgb(22 23 25 / 12%);
  }
  .listWrap {
    padding: 6px 8px;
    text-align: left;
    background: #ebecf0;
    border-radius: 4px;
    width: 272px;
    box-sizing: border-box;
    color: #5e6c84;
    float: left;
    margin-right: 10px;
    min-height: 80px;
    .list-header {
      position: relative;
      font-size: 14px;
      font-weight: bold;
      height: 30px;
      padding: 5px 20px 5px 5px;
      .list-name {
        width: 90%;
        height: 20px;
        background: #ebecf0;
        border: none;
        font-size: 14px;
        font-weight: bold;
        color: #455167;
      }
      .list-more-action {
        position: absolute;
        right: 0;
        top: 4px;
        padding: 4px;
        cursor: pointer;
      }
    }
    .drag-cards {
      overflow: auto;
      max-height: 400px;
      .card {
        padding-bottom: 7px;
        cursor: pointer;
        .card-content {
          min-height: 32px;
          height: auto;
          background-color: #ffffff;
          padding: 0 0 0 10px;
          border-radius: 3px;
          box-shadow: 0 1.2px 0px 0px;
          display: flex;
          align-items: center;
        }
      }
    }
    .add-card {
      width: 100%;
      padding-left: 10px;
      text-align: left;
      color: #5e6c84;
      background-color: #ebecf0;
      border-color: #ebecf0
    }
    .form-add-card {
      display: none;
      .el-input {
        margin-bottom: 7px;
      }
    }
  }
</style>