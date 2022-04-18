import axios from './axios.js'

export const getMenu = (data) => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'POST',
    data: data
  })
}

export const getData = () => {
  return axios.request({
    url: '/home/getData',
    method: 'GET'
  })
}

export const getUser = (params) => {
  return axios.request({
    url: '/user/getUser',
    method: 'GET',
    params: params
  })
}

export const addUser = (data) => {
  return axios.request({
    url: '/user/add',
    method: 'POST',
    data: data
  })
}
