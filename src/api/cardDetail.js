import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function getCardDetail (parameter) {
  return axios({
    url: '/v1/customer/card/detail',
    method: 'post',
    data: parameter
  })
}

export function addCardDetail (parameter) {
  return axios({
    url: '/v1/customer/card/detail/add',
    method: 'post',
    data: parameter
  })
}

export function deleteCardDetail (parameter) {
  return axios({
    url: '/v1/customer/card/detail/delete',
    method: 'delete',
    params: parameter
  })
}

export function editCardDetail (parameter) {
  return axios({
    url: '/v1/customer/card/detail/edit',
    method: 'post',
    data: parameter
  })
}

export function getBankList (parameter) {
  return axios({
    url: '/v1/bank/list',
    method: 'get',
    params: parameter
  })
}

export function addBank (parameter) {
  return axios({
    url: '/v1/bank/add',
    method: 'post',
    data: parameter
  })
}

export function deleteBank (parameter) {
  return axios({
    url: '/v1/bank/delete',
    method: 'delete',
    params: parameter
  })
}

export function receivePersonList (parameter) {
  return axios({
    url: '/v1/receive_person/list',
    method: 'get',
    params: parameter
  })
}

export function addReceivePerson (parameter) {
  return axios({
    url: '/v1/receive_person/add',
    method: 'post',
    data: parameter
  })
}

export function deleteReceivePerson (parameter) {
  return axios({
    url: '/v1/receive_person/delete',
    method: 'delete',
    params: parameter
  })
}

export function personCityList (parameter) {
  return axios({
    url: '/v1/person_city/list',
    method: 'get',
    params: parameter
  })
}

export function cityPermissionList (parameter) {
  return axios({
    url: '/v1/person_city/list/permission',
    method: 'get',
    params: parameter
  })
}

export function addPersonCity (parameter) {
  return axios({
    url: '/v1/person_city/add',
    method: 'post',
    data: parameter
  })
}

export function deletePersonCity (parameter) {
  return axios({
    url: '/v1/person_city/delete',
    method: 'delete',
    params: parameter
  })
}

export function cityList (parameter) {
  return axios({
    url: '/v1/city/list',
    method: 'get',
    params: parameter
  })
}

export function swipeCardRecord (parameter) {
  return axios({
    url: '/v1/customer/card/detail/swipe_card_record',
    method: 'get',
    params: parameter
  })
}

export function editSwipeCardRecord (parameter) {
  return axios({
    url: '/v1/customer/card/detail/swipe_card_record/edit',
    method: 'post',
    data: parameter
  })
}

export function addSwipeCardRecord (parameter) {
  return axios({
    url: '/v1/customer/card/detail/swipe_card_record/add',
    method: 'post',
    data: parameter
  })
}

export function deleteSwipeCardRecord (parameter) {
  return axios({
    url: '/v1/customer/card/detail/swipe_card_record/delete',
    method: 'delete',
    params: parameter
  })
}

export function repaymentRecord (parameter) {
  return axios({
    url: '/v1/customer/card/detail/repayment_record',
    method: 'get',
    params: parameter
  })
}

export function addRepaymentRecord (parameter) {
  return axios({
    url: '/v1/customer/card/detail/repayment_record/add',
    method: 'post',
    data: parameter
  })
}

export function deleteRepaymentRecord (parameter) {
  return axios({
    url: '/v1/customer/card/detail/repayment_record/delete',
    method: 'delete',
    params: parameter
  })
}

export function editRepaymentRecord (parameter) {
  return axios({
    url: '/v1/customer/card/detail/repayment_record/edit',
    method: 'post',
    data: parameter
  })
}
