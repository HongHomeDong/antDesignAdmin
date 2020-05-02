<template>
  <div class="pageIndex">
    <div class="operation-btn-box">
      <a-button type="primary" @click="addCustomer">
        新增银行
      </a-button>
    </div>
    <div class="table-box clearfix">
      <a-table
        :columns="columns"
        :dataSource="data"
        rowKey="id"
        :loading="state.searchLoading"
        :scroll="{ y: scrollY }"
        :pagination="false">
        <a style="color: #f5222d;" slot="delete" slot-scope="record" @click="rowDelete(record)">
          删除
        </a>
        <a slot="custom" slot-scope="record" @click="rowCustom(record)">
          操作
        </a>

      </a-table>
      <a-pagination
        :page-size="pagination.limit"
        class="table-pagination fl"
        :total="pagination.total"
        @change="pageChange"
        @showSizeChange="sizeChange"
        showSizeChanger
        showQuickJumper/>
    </div>
    <!-- 新增 -->
    <a-modal
      title="新增银行"
      :visible="addDetailVisible"
      @cancel="cancel"
      :confirmLoading="state.submitLoading"
      :maskClosable="false"
      :confirm-loading="state.addDetailLoading"
      @ok="handleSubmit"
    >
      <a-form-model
        ref="ruleForm"
        :model="detailData"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="发卡银行" prop="bankName">
          <a-input
            v-model="detailData.bankName"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
  import {
    getBankList,
    addBank,
    deleteBank
  } from '@/api/cardDetail'

  const columns = [
    { title: '发卡银行', dataIndex: 'bank', key: 'bank', width: 700 },
    {
      title: '删除',
      width: 70,
      key: 'delete',
      fixed: 'right',
      scopedSlots: { customRender: 'delete' }
    }
  ]

  export default {
    name: 'Banks',
    components: {},
    data () {
      return {
        data: [],
        columns,
        scrollY: 0,
        pagination: {
          page: 1,
          limit: 20,
          total: 0
        },
        addDetailVisible: false,
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        state: {
          searchLoading: false,
          addDetailLoading: false,
          submitLoading: false
        },

        detailData: {
          bankName: ''
        },

        rules: {
          bankName: [
            { required: true, trigger: 'blur', message: '收卡人不能为空' }
          ]
        }
      }
    },
    mounted () {
      const antLayoutContent = document.body.clientHeight
      this.scrollY = antLayoutContent - 300
      this.getCardDetailApi()
    },
    methods: {
      pageChange (page, limit) {
        console.log(page, limit)
        this.pagination.page = page
        this.pagination.limit = limit
        this.getCardDetailApi()
      },
      sizeChange (page, limit) {
        this.pagination.page = page
        this.pagination.limit = limit
        this.getCardDetailApi()
        console.log(page, limit)
      },
      rowCustom (row) {
        this.$router.push({ name: 'cardDetail', query: { id: row.id } })
      },
      cancel () {
        this.addDetailVisible = false
        this.detailData = {
          person: ''
        }
      },
      addCustomer () {
        this.addDetailVisible = true
      },
      handleSubmit () {
        this.state.submitLoading = true
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            addBank(this.detailData)
              .then(res => {
                this.state.submitLoading = false
                this.getCardDetailApi()
                this.cancel()
                this.$message.success('新增成功')
              })
          } else {
            this.state.submitLoading = false
            console.log('error submit!!')
            return false
          }
        })
      },
      search () {
        this.state.searchLoading = true
        this.getCardDetailApi()
      },
      getCardDetailApi () {
        this.state.searchLoading = true
        const { limit, page } = this.pagination
        getBankList({
          page,
          limit
        })
          .then(res => {
            console.log(res)
            this.state.searchLoading = false
            const { data, total } = res
            this.data = data
            this.pagination.total = Number(total)
          })
          .catch(error => {
            this.state.searchLoading = false
            console.error(error)
          })
      },
      rowDelete (e, value) {
        this.$confirm({
          title: '删除',
          content: '确定删除该条数据？',
          onOk: () => {
            return deleteBank({ id: e.id })
              .then(res => {
                this.getCardDetailApi()
              })
          },
          onCancel () {}
        })
      },
      rowEdit (e, value) {
        console.log(e, value)
        this.detailData = { ...e }
        this.addDetailVisible = true
      }
    }
  }
</script>
<style lang="less" scoped>
  .ant-input-number {
    width: 100%;
  }
  .pageIndex {
    height: 100%;
    display: flex;
    flex-direction: column;

    .search-box {
      margin-bottom: 10px;
    }

    .table-box {
      flex: 1;
    }

    .operation-btn-box {
      margin-bottom: 10px;
    }
  }

  .table-pagination {
    margin-top: 10px;
  }
</style>
