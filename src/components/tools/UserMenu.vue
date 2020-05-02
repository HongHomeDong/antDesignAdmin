<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" src="https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png"/>
          <span>{{ nickname }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="1">
            <a href="javascript:;" @click="addDetailVisible = true">
              <a-icon type="edit" />
              <span>修改密码</span>
            </a>
          </a-menu-item>
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <!-- 新增 -->
    <a-modal
      title="重置密码"
      :visible="addDetailVisible"
      @cancel="cancel"
      :confirmLoading="state.submitLoading"
      :maskClosable="false"
      @ok="handleSubmit"
    >
      <a-form ref="formRegister" :form="form" id="formRegister">
        <a-form-item label="旧密码">
          <a-input
            size="large"
            type="password"
            autocomplete="false"
            placeholder="请输入旧密码"
            v-decorator="['oldpassword', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
          ></a-input>
        </a-form-item>
        <a-popover
          placement="rightTop"
          :trigger="['focus']"
          :getPopupContainer="(trigger) => trigger.parentElement"
          v-model="state.passwordLevelChecked">
          <template slot="content">
            <div :style="{ width: '240px' }" >
              <div :class="['user-register', passwordLevelClass]">强度：<span>{{ passwordLevelName }}</span></div>
              <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor " />
              <div style="margin-top: 10px;">
                <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
              </div>
            </div>
          </template>
          <a-form-item label="新密码">
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              @click="handlePasswordInputClick"
              placeholder="请输入新密码"
              v-decorator="['newpassword', {rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
            ></a-input>
          </a-form-item>
        </a-popover>
      </a-form>

    </a-modal>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import { modifyPassword } from '@/api/login'
import { mapActions, mapGetters } from 'vuex'
const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
export default {
  name: 'UserMenu',
  components: {
    NoticeIcon
  },
  data () {
    return {
      form: this.$form.createForm(this),
      addDetailVisible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      state: {
        submitLoading: false,
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      rules: {
        oldpassword: [
          { required: true, trigger: 'blur', message: '收卡人不能为空' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['nickname', 'avatar']),
    passwordLevelClass () {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName () {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor () {
      return levelColor[this.state.passwordLevel]
    }
  },
  methods: {
    ...mapActions(['Logout']),
    handleSubmit () {
      const { form: { validateFields }, state } = this
      this.state.submitLoading = true
      validateFields({ force: true }, (err, values) => {
        if (!err) {
          modifyPassword()
            .then(res => {
              state.passwordLevelChecked = false
              state.submitLoading = false
              this.addDetailVisible = false
              this.$message.warn('重置成功，重新登录')
              this.Logout({}).then(() => {
                setTimeout(() => {
                  window.location.reload()
                }, 16)
              })
            })
            .catch(() => {
              state.passwordLevelChecked = false
              state.submitLoading = false
            })
        } else {
          this.state.submitLoading = false
        }
      })
    },

    handlePasswordInputClick () {
      this.state.passwordLevelChecked = true
    },

    handlePasswordLevel (rule, value, callback) {
      let level = 0
      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      this.state.passwordLevel = level
      this.state.percent = level * 30
      if (level >= 2 && value.length >= 6) {
        if (level >= 3) {
          this.state.percent = 100
        }
        callback()
      } else {
        if (level === 0) {
          this.state.percent = 10
        }
        callback(new Error('密码强度不够'))
      }
    },

    handlePasswordCheck (rule, value, callback) {
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && value.length < 6) {
        callback(new Error('最少输入6位'))
      }
      callback()
    },
    cancel () {
      this.form.resetFields()
      this.addDetailVisible = false
    },
    handleLogout () {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          return this.Logout({}).then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 16)
          }).catch(err => {
            this.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
