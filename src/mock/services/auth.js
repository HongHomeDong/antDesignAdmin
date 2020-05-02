import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const usercode = ['admin', 'super']
// 强硬要求 ant.design 相同密码
// '21232f297a57a5a743894a0e4a801fc3',
const password = ['admin'] // admin, ant.design

const login = (options) => {
  const body = getBody(options)
  console.log('mock: body', body)
  if (!usercode.includes(body.usercode) || !password.includes(body.password)) {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }

  return builder({
    'name': Mock.mock('@name'),
    'token': '4291d7da9005377ec9aec4a71ea837f'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

const smsCaptcha = () => {
  return builder({ captcha: Mock.mock('@integer(10000, 99999)') })
}

const twofactor = () => {
  return builder({ stepCode: Mock.mock('@integer(0, 1)') })
}

const modifyPassword = () => {
  return builder({}, '[测试接口] 重置成功')
}

const createUser = () => {
  return builder({}, '[测试接口] 添加成功')
}
Mock.mock(/\/v1\/account\/login\/username/, 'post', login)
Mock.mock(/\/v1\/account\/password\/modify/, 'post', modifyPassword)
Mock.mock(/\/v1\/account\/logout/, 'post', logout)
Mock.mock(/\/v1\/account\/create/, 'post', createUser)

Mock.mock(/\/account\/sms/, 'post', smsCaptcha)
Mock.mock(/\/auth\/2step-code/, 'post', twofactor)
