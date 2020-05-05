<template>
  <div class="cardDetail">
    <a-tabs v-model="tagType" @change="tagHandle">
      <a-tab-pane key="1" tab="刷卡记录">
      </a-tab-pane>
      <a-tab-pane key="2" tab="还款记录" force-render>
      </a-tab-pane>
    </a-tabs>
    <template v-if="tagType === '1'">
      <div class="operation-btn-box">
        <a-button type="primary" @click="addRecord">
          新增刷卡记录
        </a-button>
      </div>
      <div class="table-box clearfix">
        <a-table
          :columns="swipeColumns"
          :dataSource="swipeData"
          rowKey="id"
          :loading="state.searchLoading"
          :pagination="false">
          <span slot="index" slot-scope="text, record, index">
          {{index + 1}}
        </span>
          <a slot="edit" slot-scope="record" @click="swipeRowEdit(record)">
            编辑
          </a>
          <a style="color: #f5222d;" slot="delete" slot-scope="record" @click="swipeRowDelete(record)">
            删除
          </a>

        </a-table>
        <a-pagination
        class="table-pagination fl"
        :total="swipePagination.total"
        showSizeChanger
        :page-size="swipePagination.limit"
        @change="swipePageChange"
        @showSizeChange="swipeSizeChange"
        showQuickJumper/>
      </div>
    </template>
    <template v-if="tagType === '2'">
      <div class="operation-btn-box">
        <a-button type="primary" @click="addRepayment">
          新增还款记录
        </a-button>
      </div>
      <div class="table-box clearfix">
        <a-table
          :columns="repaymentColumns"
          :dataSource="repaymentData"
          rowKey="id"
          :loading="state.searchLoading"
          :pagination="false">
          <span slot="index" slot-scope="text, record, index">
          {{index + 1}}
        </span>
          <a slot="edit" slot-scope="record" @click="repaymentRowEdit(record)">
            编辑
          </a>
          <a style="color: #f5222d;" slot="delete" slot-scope="record" @click="repaymentRowDelete(record)">
            删除
          </a>

        </a-table>
        <a-pagination
          class="table-pagination fl"
          :total="repaymentPagination.total"
          showSizeChanger
          :page-size="repaymentPagination.limit"
          @change="repaymentPageChange"
          @showSizeChange="repaymentSizeChange"
          showQuickJumper/>
      </div>
    </template>
    <a-modal
      :title="swipeRecordFromData.id ? '编辑刷卡记录' : '新增刷卡记录'"
      :visible="swipeRecordVisible"
      @cancel="cancel"
      :confirmLoading="state.submitLoading"
      :maskClosable="false"
      :width="700"
      :confirm-loading="state.recordLoading"
      @ok="handleSubmit"
    >
      <a-form-model
        ref="swipeRules"
        :model="swipeRecordFromData"
        :rules="swipeRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="刷卡商户" prop="merchant">
          <a-input
            v-model="swipeRecordFromData.merchant"
          />
        </a-form-model-item>
        <a-form-model-item label="刷卡金额" prop="amount">
          <a-input-number
            v-model="swipeRecordFromData.amount"
            :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
          />
        </a-form-model-item>
        <a-form-model-item label="刷卡时间" required prop="date">
          <a-date-picker
            v-model="swipeRecordFromData.date"
            :default-value="swipeRecordFromData.date && $moment(swipeRecordFromData.date, 'YYYY-MM-DD')"
            type="date"
            placeholder="选择时间"
            style="width: 100%;"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-modal
      :title="recordFromData.id ? '编辑还款记录' : '新增还款记录'"
      :visible="recordVisible"
      @cancel="cancel"
      :confirmLoading="state.submitLoading"
      :maskClosable="false"
      :width="700"
      :confirm-loading="state.recordLoading"
      @ok="handleSubmit"
    >
      <a-form-model
        ref="ruleForm"
        :model="recordFromData"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="还款金额" prop="amount">
          <a-input-number
            v-model="recordFromData.amount"
            :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
          />
        </a-form-model-item>
        <a-form-model-item label="还款时间" required prop="date">
          <a-date-picker
            v-model="recordFromData.date"
            :default-value="recordFromData.date && $moment(recordFromData.date, 'YYYY-MM-DD')"
            type="date"
            placeholder="选择时间"
            style="width: 100%;"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
  import {
    editSwipeCardRecord,
    addSwipeCardRecord,
    deleteSwipeCardRecord,
    swipeCardRecord,
    repaymentRecord,
    addRepaymentRecord,
    deleteRepaymentRecord,
    editRepaymentRecord
  } from '@/api/cardDetail'

  const swipeColumns = [
    {
      title: '序号',
      width: 80,
      scopedSlots: { customRender: 'index' }
    },
    { title: '时间', width: 200, dataIndex: 'date', key: 'date', fixed: 'left' },
    { title: '刷卡商户', width: 500, dataIndex: 'merchant', key: 'merchant', fixed: 'left' },
    { title: '刷卡金额', dataIndex: 'amount', key: 'amount', width: 350 },
    {
      title: '删除',
      width: 120,
      key: 'delete',
      fixed: 'right',
      scopedSlots: { customRender: 'delete' }
    },
    {
      title: '编辑',
      width: 120,
      key: 'edit',
      fixed: 'right',
      scopedSlots: { customRender: 'edit' }
    }
  ]

  const repaymentColumns = [
    {
      title: '序号',
      width: 80,
      scopedSlots: { customRender: 'index' }
    },
    { title: '时间', width: 400, dataIndex: 'date', key: 'date', fixed: 'left' },
    { title: '刷卡金额', dataIndex: 'amount', key: 'amount', width: 550 },
    {
      title: '删除',
      width: 120,
      key: 'delete',
      fixed: 'right',
      scopedSlots: { customRender: 'delete' }
    },
    {
      title: '编辑',
      width: 120,
      key: 'edit',
      fixed: 'right',
      scopedSlots: { customRender: 'edit' }
    }
  ]

  export default {
    name: 'CardDetail',
    data () {
      return {
        tagType: '1',
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
        swipePagination: {
          limit: 20,
          page: 1,
          total: 0
        },
        repaymentPagination: {
          limit: 20,
          page: 1,
          total: 0
        },
        recordVisible: false,
        swipeRecordVisible: false,
        swipeColumns,
        repaymentColumns,
        swipeData: [],
        repaymentData: [],
        rules: {
          amount: [
            { required: true, trigger: 'blur', message: '金额不能为空' }
          ],
          date: [
            { required: true, trigger: 'change', message: '请选择时间' }
          ],
          merchant: [
            { required: true, trigger: 'change', message: '请输入商户' }
          ]
        },
        swipeRules: {
          amount: [
            { required: true, trigger: 'blur', message: '金额不能为空' }
          ],
          date: [
            { required: true, trigger: 'change', message: '请选择时间' }
          ],
          merchant: [
            { required: true, trigger: 'change', message: '请输入商户' }
          ]
        },

        state: {
          searchLoading: false,
          recordLoading: false,
          submitLoading: false
        },

        recordFromData: {
          id: '',
          date: null,
          amount: '',
          customerId: ''
        },
        swipeRecordFromData: {
          id: '',
          date: null,
          amount: '',
          merchant: '',
          customerId: ''
        }
      }
    },
    mounted () {
      this.getSwipeCardRecordApi()
    },
    methods: {
      repaymentRowEdit (item) {
        this.recordVisible = true
        this.recordFromData = { ...item }
        this.recordFromData.date = this.$moment(this.recordFromData.date)
      },
      repaymentRowDelete (item) {
        this.$confirm({
          title: '删除',
          content: '确定删除该条数据？',
          onOk: () => {
            return deleteRepaymentRecord({ id: item.id })
              .then(res => {
                this.$message.success('删除成功')
                this.getSwipeCardRecordApi()
              })
          },
          onCancel () {
          }
        })
      },
      addRepayment () {
        this.recordVisible = true
      },
      swipePageChange (page, pageSize) {
        console.log(page, pageSize)
        this.swipePagination.limit = pageSize
        this.swipePagination.page = pageSize
        this.getSwipeCardRecordApi()
      },
      swipeSizeChange (page, pageSize) {
        this.repaymentPagination.limit = pageSize
        this.repaymentPagination.page = pageSize
        this.getRepaymentRecordApi()
      },
      repaymentPageChange (page, pageSize) {
        console.log(page, pageSize)
        this.repaymentPagination.limit = pageSize
        this.repaymentPagination.page = pageSize
        this.getRepaymentRecordApi()
      },
      repaymentSizeChange (page, pageSize) {
        this.repaymentPagination.limit = pageSize
        this.repaymentPagination.page = pageSize
        this.getRepaymentRecordApi()
      },
      tagHandle () {
        if (this.tagType === '2') {
          this.getRepaymentRecordApi()
        } else if (this.tagType === '1') {
          this.getSwipeCardRecordApi()
        }
      },
      swipeRowEdit (item) {
        this.swipeRecordVisible = true
        this.swipeRecordFromData = { ...item }
      },
      swipeRowDelete (item) {
        this.$confirm({
          title: '删除',
          content: '确定删除该条数据？',
          onOk: () => {
            return deleteSwipeCardRecord({ id: item.id })
              .then(res => {
                this.$message.success('删除成功')
                this.getSwipeCardRecordApi()
              })
          },
          onCancel () {
          }
        })
      },
      cancel () {
        this.recordVisible = false
        this.swipeRecordVisible = false
        this.recordFromData = {
          'id': '',
          'date': null,
          'amount': ''
        }
        this.swipeRecordFromData = {
          'id': '',
          'date': null,
          'amount': '',
          'merchant': ''
        }
      },
      getSwipeCardRecordApi () {
        this.state.searchLoading = true
        const { limit, page } = this.swipePagination
        swipeCardRecord({
          customerId: this.$route.query.id,
          page,
          limit
        })
          .then(res => {
            const { list, total } = res.data
            this.state.searchLoading = false
            this.swipeData = list
            this.swipePagination.total = total
          })
          .catch(() => {
            this.state.searchLoading = false
          })
      },
      getRepaymentRecordApi () {
        this.state.searchLoading = true
        const { limit, page } = this.repaymentPagination
        repaymentRecord({
          customerId: this.$route.query.id,
          page,
          limit
        })
          .then(res => {
            const { list, total } = res.data
            this.state.searchLoading = false
            this.repaymentPagination.total = total
            this.repaymentData = list
          })
          .catch(() => {
            this.state.searchLoading = false
          })
      },
      handleSubmit () {
        this.state.submitLoading = true
        const form = this.tagType === '1' ? 'swipeRules' : 'ruleForm'
        this.$refs[form].validate(valid => {
          console.log(this.tagType)
          debugger
          if (valid) {
            let submitApi = null
            let data = null
            let getListApi = null
            if (this.tagType === '1') {
              data = this.swipeRecordFromData
              submitApi = data.id ? editSwipeCardRecord : addSwipeCardRecord
              getListApi = this.getSwipeCardRecordApi
            } else {
              data = this.recordFromData
              submitApi = data.id ? editRepaymentRecord : addRepaymentRecord
              getListApi = this.getRepaymentRecordApi
            }
            data.customerId = this.$route.query.id
            const submitSuccessMessage = data.id ? '修改成功' : '新增成功'
            submitApi(data)
              .then(res => {
                this.state.submitLoading = false
                getListApi()
                this.cancel()
                this.$message.success(submitSuccessMessage)
              })
              .catch(error => {
                this.state.submitLoading = false
                console.log(error)
              })
          } else {
            this.state.submitLoading = false
            console.log('error submit!!')
            return false
          }
        })
      },
      addRecord () {
        this.swipeRecordVisible = true
      }
    }
  }
</script>

<style scoped lang="less">
  .ant-input-number {
    width: 100%;
  }

  .ant-input-number {
    width: 100%;
  }

  .cardDetail {
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
