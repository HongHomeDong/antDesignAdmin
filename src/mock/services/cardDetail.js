import Mock from 'mockjs2'
import { builder } from '../util'

const detail = (options) => {
  return builder({
    'code': 0,
    'data': {
      'list': [
        {
          'bankName': 'string',
          'bankcardNo': 'string',
          'beginAvailableLimit': 'string',
          'beginDate': 'string',
          'beginTotalLimit': 'string',
          'city': 'string',
          'id': 0,
          'idcardNo': 'string',
          'instalmentFee': 'string',
          'issuingPerson': 'string',
          'name': 'string',
          'phone': 'string',
          'updateAt': 'string'
        }
      ],
      'total': 0
    },
    'msg': 'string'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const detailAdd = (options) => {
  return builder({
      'code': 0,
      'data': {},
      'msg': 'string'
    }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const detailDelete = (options) => {
  return builder({
      'code': 0,
      'data': {},
      'msg': 'string'
    }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const detailEdit = (options) => {
  return builder({
      'code': 0,
      'data': {},
      'msg': 'string'
    }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const bank = (options) => {
  return builder({
    'code': 0,
    'data': [
      {
        'bank': 'string',
        'id': 0
      }
    ],
    'msg': 'string'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const addBank = (options) => {
  if (!options.bankName) {
    return builder({
      'code': 0,
      'data': {},
      'msg': 'string'
    }, '请选择银行', 401)
  }
  return builder({ }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const deleteBank = (options) => {
  if (!options.id) {
    return builder({
      'code': 1,
      'data': {},
      'msg': 'string'
    }, 'id不能为空', 401)
  }
  return builder({
    'code': 0,
    'data': {},
    'msg': 'string'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const receivePersonList = (options) => {
  return builder({
      'code': 0,
      'data': [
        {
          'id': 0,
          'person': 'string'
        }
      ],
      'msg': 'string'
    }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const addReceivePerson = (options) => {
  if (!options.person) {
    return builder({
      'code': 1,
      'data': {},
      'msg': 'string'
    }, '不能为空', 401)
  }
  return builder({
      'code': 0,
      'data': {},
      'msg': 'string'
    }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const deleteReceivePerson = (options) => {
  if (!options.id) {
    return builder({
      'code': 1,
      'data': {},
      'msg': 'string'
    }, '不能为空', 401)
  }
  return builder({
      'code': 0,
      'data': {},
      'msg': 'string'
    }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const personCityList = (options) => {
  return builder({
      'data': {
        'code': 0,
        'data': [
          {
            'city': 'string',
            'id': 0,
            'person': 'string'
          }
        ],
        'msg': 'string'
      } }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const addPersonCity = (options) => {
  if (!options.person || !options.city) {
    return builder({
      'code': 0,
      'data': {},
      'msg': 'string'
    }, '不能为空', 401)
  }
  return builder({ }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const deletePersonCity = (options) => {
  if (!options.id) {
    return builder({
      'code': 0,
      'data': {},
      'msg': 'string'
    }, '不能为空', 401)
  }
  return builder({ }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const cityList = (options) => {
  return builder({
      'code': 0,
      'data': [
        'string'
      ],
      'msg': 'string'
    }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const permissionCityList = (options) => {
  return builder({
      'code': 0,
      'data': [
        'string'
      ],
      'msg': 'string'
    }
    , '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const swipeCardRecord = (options) => {
  return builder({
    'code': 0,
    'data': {
      'list': [
        {
          'amount': 'string',
          'date': 'string',
          'id': 0,
          'merchant': 'string'
        }
      ],
      'total': 0
    },
    'msg': 'string'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const addSwipeCardRecord = (options) => {
  return builder({
    'code': 0,
    'data': {},
    'msg': 'string'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
const editSwipeCardRecord = (options) => {
  return builder({
    'code': 0,
    'data': {},
    'msg': 'string'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
const deleteSwipeCardRecord = (options) => {
  return builder({
    'code': 0,
    'data': {},
    'msg': 'string'
  }, 200, { 'Custom-Header': Mock.mock('@guid') })
}

const repaymentRecord = (options) => {
  return builder({
    'code': 0,
    'data': {
      'list': [
        {
          'amount': 'string',
          'date': 'string',
          'id': 0
        }
      ],
      'total': 0
    },
    'msg': 'string'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
const addRepaymentRecord = (options) => {
  return builder({
    'code': 0,
    'data': {},
    'msg': 'string'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
const editRepaymentRecord = (options) => {
  return builder({
    'code': 0,
    'data': {},
    'msg': 'string'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
const deleteRepaymentRecord = (options) => {
  return builder({
    'code': 0,
    'data': {},
    'msg': 'string'
  }, 200, { 'Custom-Header': Mock.mock('@guid') })
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
Mock.mock(/\/v1\/person_city\/list\/permission/, 'get', permissionCityList)

Mock.mock(/\/v1\/person_city\/add/, 'post', addPersonCity)
Mock.mock(/\/v1\/person_city\/delete/, 'post', deletePersonCity)

// 城市
Mock.mock(/\/v1\/city\/list/, 'get', cityList)
