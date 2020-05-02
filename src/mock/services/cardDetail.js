import Mock from 'mockjs2'
import { builder } from '../util'

const detail = (options) => {
  return builder({
    'page': '1',
    'total': '245',
    'data': [
      {
              'id': '1',
    'name': '张三',
    'idcardNo': '51072219991201',
    'phone': '18810981234',
    'bankName': '光大银行',
    'bankcardNo': '123456789012243',
    'beginDate': '2020-03-04',
    'beginTotalLimit': '25000.55',
    'beginAvailableLimit': '12.05',
    'instalmentFee': '223.89',
    'issuingPerson': '王老五',
    'updateAt': '2020-04-06 15:37:56'
},
  {
  'id': '2',
    'name': '张三',
    'idcardNo': '51072219991201',
    'phone': '18810981234',
    'bankName': '光大银行',
    'bankcardNo': '123456789012243',
    'beginDate': '2020-03-04',
    'beginTotalLimit': '25000.55',
    'beginAvailableLimit': '12.05',
    'instalmentFee': '223.89',
    'issuingPerson': '王老五',
    'updateAt': '2020-04-06 15:37:56'
  },
  {
  'id': '3',
    'name': '张三',
    'idcardNo': '51072219991201',
    'phone': '18810981234',
    'bankName': '光大银行',
    'bankcardNo': '123456789012243',
    'beginDate': '2020-03-04',
    'beginTotalLimit': '25000.55',
    'beginAvailableLimit': '12.05',
    'instalmentFee': '223.89',
    'issuingPerson': '王老五',
    'updateAt': '2020-04-06 15:37:56'
  }
]
}, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const detailAdd = (options) => {
  return builder({ }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const detailDelete = (options) => {
  return builder({ }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const detailEdit = (options) => {
  return builder({ }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const bank = (options) => {
  return builder({
    'data': [
      {
        'id': '1',
        'bank': '⺠民⽣生银⾏行行' },
      {
        'id': '2',
        'bank': '中国银⾏行行' }
    ] }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const addBank = (options) => {
  if (!options.bankName) {
    return builder({ }, '请选择银行', 401)
  }
  return builder({ }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const deleteBank = (options) => {
  if (!options.id) {
    return builder({ }, 'id不能为空', 401)
  }
  return builder({ }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const receivePersonList = (options) => {
  return builder({ 'data': [ { 'id': '1', 'person': 'ୟӣ' }, { 'id': '2', 'person': 'ࢥ๫' }, { 'id': '3', 'person': 'ሴᘌԲ' } ] }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const addReceivePerson = (options) => {
  if (!options.person) {
    return builder({ }, '不能为空', 401)
  }
  return builder({ }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const deleteReceivePerson = (options) => {
  if (!options.id) {
    return builder({ }, '不能为空', 401)
  }
  return builder({ }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const personCityList = (options) => {
  return builder({
      'data': [
        { 'id': '1', 'person': 'ୟӣ', 'city': 'ᖍᴡ૱' }, { 'id': '2', 'person': 'ୟӣ', 'city': '౮᮷૱' }, { 'id': '3', 'person': 'ሴᘌԲ', 'city': 'ಅํ' } ] }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const addPersonCity = (options) => {
  if (!options.person || !options.city) {
    return builder({ }, '不能为空', 401)
  }
  return builder({ }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const deletePersonCity = (options) => {
  if (!options.id) {
    return builder({ }, '不能为空', 401)
  }
  return builder({ }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const cityList = (options) => {
  return builder([{ 'caty': 'ᖍᴡ૱' }, { 'city': '౮᮷૱' }, { 'city': 'ᛔᨯ૱' }]
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const swipeCardRecord = (options) => {
  return builder({ 'page': '1',
      'total': '245',
      'data': [
        { 'id': '222', 'date': '2020-03-04', 'amount': '33229.55', 'merchant': 'ᯩኞ໼ྒज़ମ' },
        { 'id': '221s', 'date': '2020-03-04', 'amount': '33229.55', 'merchant': 'ᯩኞ໼ྒज़ମ' }
      ]
    }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const addSwipeCardRecord = (options) => {
  return builder({}, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
const editSwipeCardRecord = (options) => {
  return builder({}, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
const deleteSwipeCardRecord = (options) => {
  return builder({ }, 200, { 'Custom-Header': Mock.mock('@guid') })
}

const repaymentRecord = (options) => {
  return builder({ 'page': '1', 'total': '245', 'data': [ { 'id': '111', 'date': '2020-03-04', 'amount': '33229.55' }, { 'id': '112', 'date': '2020-03-05', 'amount': '33229.55' }, { 'id': '113', 'date': '2020-03-06', 'amount': '33229.55' } ] }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
const addRepaymentRecord = (options) => {
  return builder({}, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
const editRepaymentRecord = (options) => {
  return builder({}, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
const deleteRepaymentRecord = (options) => {
  return builder({ }, 200, { 'Custom-Header': Mock.mock('@guid') })
}
// 客户记录
Mock.mock(/\/v1\/customer\/card\/detail/, 'post', detail)
Mock.mock(/\/v1\/customer\/card\/detail\/add/, 'post', detailAdd)
Mock.mock(/\/v1\/customer\/card\/detail\/delete/, 'post', detailDelete)
Mock.mock(/\/v1\/customer\/card\/detail\/edit/, 'post', detailEdit)

// 刷卡记录
Mock.mock(/\/v1\/customer\/card\/detail\/swipe_card_record/, 'get', swipeCardRecord)
Mock.mock(/\/v1\/customer\/card\/detail\/swipe_card_record\/add/, 'post', addSwipeCardRecord)
Mock.mock(/\/v1\/customer\/card\/detail\/swipe_card_record\/edit/, 'post', editSwipeCardRecord)
Mock.mock(/\/v1\/customer\/card\/detail\/swipe_card_record\/delete/, 'post', deleteSwipeCardRecord)

// 还款记录
Mock.mock(/\/v1\/customer\/card\/detail\/repayment_record/, 'get', repaymentRecord)
Mock.mock(/\/v1\/customer\/card\/detail\/repayment_record\/add/, 'post', addRepaymentRecord)
Mock.mock(/\/v1\/customer\/card\/detail\/repayment_record\/edit/, 'post', editRepaymentRecord)
Mock.mock(/\/v1\/customer\/card\/detail\/repayment_record\/delete/, 'post', deleteRepaymentRecord)

// 发卡银行
Mock.mock(/\/v1\/bank\/list/, 'get', bank)
Mock.mock(/\/v1\/bank\/add/, 'post', addBank)
Mock.mock(/\/v1\/bank\/delete/, 'post', deleteBank)

// 收卡人
Mock.mock(/\/v1\/receive_person\/list/, 'get', receivePersonList)
Mock.mock(/\/v1\/receive_person\/add/, 'post', addReceivePerson)
Mock.mock(/\/v1\/receive_person\/delete/, 'post', deleteReceivePerson)

// 人员城市
Mock.mock(/\/v1\/person_city\/list/, 'get', personCityList)
Mock.mock(/\/v1\/person_city\/add/, 'post', addPersonCity)
Mock.mock(/\/v1\/person_city\/delete/, 'post', deletePersonCity)

// 城市
Mock.mock(/\/v1\/city\/list/, 'get', cityList)
