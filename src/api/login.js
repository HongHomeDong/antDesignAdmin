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
export function login (parameter) {
  return axios({
    url: '/v1/account/login/username',
    method: 'post',
    data: parameter
  })
}

export function logout () {
  return axios({
    url: '/v1/account/logout',
    method: 'post'
  })
}

export function modifyPassword (parameter) {
  return axios({
    url: '/v1/account/password/modify',
    method: 'post',
    data: parameter
  })
}

export function createUser (parameter) {
  return axios({
    url: '/v1/account/create',
    method: 'post',
    data: parameter
  })
}
