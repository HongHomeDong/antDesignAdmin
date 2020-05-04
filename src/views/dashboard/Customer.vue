<template>
  <div class="pageIndex">
    <div class="search-box">
      <a-row :gutter="16">
        <a-col :span="5">
          <a-input placeholder="客户名称" v-model="searchData.name"/>
        </a-col>
        <a-col :span="5" >
          <a-input placeholder="客户手机号" v-model="searchData.phone"/>
        </a-col>
        <a-col :span="5" >
          <a-select style="width: 100%" placeholder="银行" v-model="searchData.bankName">
            <a-select-option :value="item.id" :key="item.id" v-for="item in options.bankList">
              {{ item.bank }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5" >
          <a-select style="width: 100%" placeholder="收卡人" v-model="searchData.issuingPerson">
            <a-select-option :value="item.id" :key="item.id" v-for="item in options.receivePersonList">
              {{ item.person }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="4" >
          <a-button type="primary" @click="search" :loading="state.searchLoading">
            查询
          </a-button>
        </a-col>
      </a-row>
    </div>
    <div class="operation-btn-box">
      <a-button type="primary" @click="addCustomer">
        新增客户
      </a-button>
    </div>
    <div class="table-box clearfix">
      <a-table
        :columns="columns"
        :dataSource="data"
        rowKey="id"
        :loading="state.searchLoading"
        :scroll="{ x: 1600, y: scrollY }"
        :pagination="false">
        <span slot="index" slot-scope="text, record, index">
          {{index + 1}}
        </span>
        <a slot="edit" slot-scope="record" @click="rowEdit(record)">
          编辑
        </a>
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
      :title="this.detailData.id ? '编辑客户' : '新增客户'"
      :visible="addDetailVisible"
      @cancel="cancel"
      :confirmLoading="state.submitLoading"
      width="80%"
      :maskClosable="false"
      :confirm-loading="state.addDetailLoading"
      @ok="handleSubmit"
    >
      <a-form-model
        ref="ruleForm"
        class="clearfix"
        :model="detailData"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="addDetailName" label="客户名称" prop="name">
          <a-input
            v-model="detailData.name"
          />
        </a-form-model-item>
        <a-form-model-item ref="addDetailIDCardNo" label="身份证号" prop="idcardNo">
          <a-input
            v-model="detailData.idcardNo"
          />
        </a-form-model-item>
        <a-form-model-item ref="addDetailPhone" label="手机号" prop="phone">
          <a-input
            v-model="detailData.phone"
          />
        </a-form-model-item>
        <a-form-model-item label="银行" prop="bankName">
          <a-select style="width: 100%" placeholder="请选择" v-model="detailData.bankName">
            <a-select-option :value="item.id" :key="item.id" v-for="item in options.bankList">
              {{ item.bank }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="城市" prop="city">
          <a-select style="width: 100%" placeholder="请选择" v-model="detailData.city">
            <a-select style="width: 100%" v-model="detailData.city">
              <a-select-option :value="item.city" :key="item.city" v-for="item in cityList">
                {{item.city}}
              </a-select-option>
            </a-select>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="银行卡号" prop="bankcardNo">
          <a-input
            v-model="detailData.bankcardNo"
          />
        </a-form-model-item>
        <a-form-model-item label="交卡时间" required prop="beginDate">
          <a-date-picker
            v-model="detailData.beginDate"
            :default-value="detailData.beginDate && $moment(detailData.beginDate, 'YYYY-MM-DD')"
            @change="handleChange"
            type="date"
            placeholder="选择时间"
            style="width: 100%;"
          />
        </a-form-model-item>
        <a-form-model-item label="交付时总额度" prop="beginTotalLimit">
          <a-input-number
            v-model="detailData.beginTotalLimit"
            :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
          />
        </a-form-model-item>
        <a-form-model-item label="交卡时可用额度" prop="beginAvailableLimit">
          <a-input-number
            v-model="detailData.beginAvailableLimit"
            :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
          />
        </a-form-model-item>
        <a-form-model-item label="分期费用" prop="instalmentFee">
          <a-input-number
            v-model="detailData.instalmentFee"
            :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
          />
        </a-form-model-item>
        <a-form-model-item label="收卡人" prop="issuingPerson">
          <a-input
            v-model="detailData.issuingPerson"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
  import {
    getCardDetail,
    getBankList,
    receivePersonList,
    addCardDetail,
    deleteCardDetail,
    editCardDetail,
    cityPermissionList
  } from '@/api/cardDetail'

  const columns = [
    {
      title: '序号',
      width: 80,
      scopedSlots: { customRender: 'index' }
    },
    { title: '客户姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: '身份证号', width: 200, dataIndex: 'idcardNo', key: 'idcardNo', fixed: 'left' },
    { title: '预留手机号', dataIndex: 'phone', key: 'phone', width: 150 },
    { title: '发卡银行', dataIndex: 'bankName', key: 'bankName', width: 150 },
    { title: '城市', dataIndex: 'city', key: 'city', width: 150 },
    { title: '卡号', dataIndex: 'bankcardNo', key: 'bankcardNo', width: 200 },
    { title: '交卡日期', dataIndex: 'updateAt', key: 'updateAt', width: 220 },
    { title: '交卡时总额度', dataIndex: 'beginTotalLimit', key: 'beginTotalLimit', width: 150 },
    { title: '交卡时可用额度', dataIndex: 'beginAvailableLimit', key: 'beginAvailableLimit', width: 150 },
    { title: '分期费用', dataIndex: 'instalmentFee', key: 'instalmentFee', width: 150 },
    { title: '收卡人', dataIndex: 'issuingPerson', key: 'issuingPerson', width: 100, fixed: 'right' },
    {
      title: '删除',
      width: 70,
      key: 'delete',
      fixed: 'right',
      scopedSlots: { customRender: 'delete' }
    },
    {
      title: '编辑',
      width: 70,
      key: 'edit',
      fixed: 'right',
      scopedSlots: { customRender: 'edit' }
    },
    {
      title: '操作',
      width: 70,
      key: 'custom',
      fixed: 'right',
      scopedSlots: { customRender: 'custom' }
    }
  ]

  export default {
    name: 'Workplace',
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
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
        state: {
          searchLoading: false,
          addDetailLoading: false,
          submitLoading: false
        },

        searchData: {
          name: '',
          phone: '',
          bankName: undefined,
          issuingPerson: undefined
        },
        cityList: [],
        detailData: {
          'id': '',
          'name': '',
          'idcardNo': '',
          'phone': '',
          'bankName': '',
          'bankcardNo': '',
          'beginDate': null,
          'beginTotalLimit': '',
          'beginAvailableLimit': '',
          'instalmentFee': '',
          'issuingPerson': ''
        },

        options: {
          bankList: [],
          receivePersonList: []
        },

        rules: {
          name: [
            { required: true, trigger: 'blur', message: '名称不能为空' }
          ],
          idcardNo: [
            { required: true, trigger: 'blur', message: '请输入正确的身份证号', pattern: /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/ }
          ],
          phone: [
            { required: true, trigger: 'blur', message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ }
          ],
          bankName: [
            { required: true, trigger: 'change', message: '请选择银行' }
          ],
          bankcardNo: [
            { required: true, trigger: 'blur', message: '请输入正确的银行卡号', pattern: /[1-9]\d{12,18}/ }
          ],
          beginDate: [
            { required: true, trigger: 'change', message: '请选择时间' }
          ],
          beginTotalLimit: [
            { required: true, trigger: 'blur', message: '交付时总额度不能为空' }
          ],
          beginAvailableLimit: [
            { required: true, trigger: 'blur', message: '交卡时可用额度不能为空' }
          ],
          instalmentFee: [
            { required: true, trigger: 'blur', message: '分期费用不能为空' }
          ],
          issuingPerson: [
            { required: true, trigger: 'blur', message: '收卡人不能为空' }
          ],
          city: [
            { required: true, trigger: 'blur', message: '城市不能为空' }
          ]
        }
      }
    },
    computed: {
      params () {
        const { name, phone, bankName, issuingPerson } = this.searchData
        const { limit, page } = this.pagination

        return {
          name,
          phone,
          bankName,
          issuing_person: issuingPerson,
          limit,
          page
        }
      }
    },
    created () {
    },
    mounted () {
      const antLayoutContent = document.body.clientHeight
      this.scrollY = antLayoutContent - 300
      this.getCardDetailApi()
      this.getBankListApi()
      this.receivePersonListApi()
      this.cityListApi()
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
      cityListApi () {
        cityPermissionList()
          .then(res => {
            if (res.code === 0) {
              this.cityList = res.data.list.map((item) => {
                return {
                  city: item
                }
              })
            }
          })
      },
      cancel () {
        this.addDetailVisible = false
        this.detailData = {
          'id': '',
          'name': '',
          'idcardNo': '',
          'phone': '',
          'bankName': '',
          'bankcardNo': '',
          'beginDate': null,
          'beginTotalLimit': '',
          'beginAvailableLimit': '',
          'instalmentFee': '',
          'issuingPerson': ''
        }
      },
      addCustomer () {
        this.addDetailVisible = true
      },
      handleSubmit () {
        this.state.submitLoading = true
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            const submitApi = this.detailData.id ? editCardDetail : addCardDetail
            const submitSuccessMessage = this.detailData.id ? '修改成功' : '新增成功'
            submitApi(this.detailData)
              .then(res => {
                this.state.submitLoading = false
                this.getCardDetailApi()
                this.cancel()
                this.$message.success(submitSuccessMessage)
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
      getBankListApi () {
        getBankList()
          .then(res => {
            this.options.bankList = res.data.list
          }).catch(() => {
        })
      },
      receivePersonListApi () {
        receivePersonList()
          .then(res => {
            this.options.receivePersonList = res.data.list
          }).catch(() => {
        })
      },
      getCardDetailApi () {
        console.log(this.params)
        this.state.searchLoading = true
        getCardDetail(this.params)
          .then(res => {
            console.log(res)
            this.state.searchLoading = false
            const { data, code } = res
            if (code === 0) {
              this.data = data.list
              this.pagination.total = Number(data.total)
            }
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
            return deleteCardDetail({ id: e.id })
              .then(res => {
                this.getCardDetailApi()
              })
          },
          onCancel () {}
        })
      },
      handleChange () {
        console.log(this.detailData)
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
  .ant-form-item {
    float: left;
    width: 50%;
  }
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
