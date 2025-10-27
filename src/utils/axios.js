import Vue from 'vue'
import axios from 'axios'

const instance = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8' // 默认请求头
    }
})

// 拦截请求头
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        console.error('请求错误：', error)
        return Promise.reject(error)
    }
)
// 拦截响应头
instance.interceptors.response.use(
    response => {
        if (response.data.status) {
            return response
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        return Promise.reject(error.response)
    }
)
// 请求回调处理函数
const sucFun = res => {
    // NProgress.done()
    return res.data
}
const errFun = err => {
    // NProgress.done()
    Vue.prototype.$message({
        type: 'error',
        message: err.data.message || err.statusText || '数据异常'
    })
    return err.data
}
// 普通POST请求
const Posting = (url = '', data = {}) => {
    // NProgress.start()
    return instance
        .post(url, data)
        .then(sucFun)
        .catch(errFun)
}
// 普通Get请求
const Geting = (url = '', data = {}) => {
    // NProgress.start()
    let reqData = {
        params: data
    }
    return instance
        .get(url, reqData)
        .then(sucFun)
        .catch(errFun)
}
// 文件流请求
const GetingBlob = (url = '', data = {}, opt = {}) => {
    // NProgress.start(opt, url)
    let config = {
        method: 'get',
        url,
        params: data,
        headers: {
            'Authorization': 'Bearer ' + localStorage.token || ''
        },
        responseType: 'blob'
    }
    return axios(config)
        .then(res => sucFun(res, opt))
        .catch(err => errFun(err, opt))
}
// 文件流请求
const PostingBlob = (url = '', data = {}) => {
    // NProgress.start()
    let config = {
        method: 'post',
        url,
        data,
        headers: {
            'Authorization': 'Bearer ' + localStorage.token || ''
        },
        responseType: 'blob'
    }
    return axios(config)
        .then(sucFun)
        .catch(errFun)
}
//  默认请求
Vue.prototype.$axios = axios
// Vue.axios = axios
// 普通POST请求
Vue.prototype.$Posting = Posting
// Vue.Posting = Posting
// 普通Get请求
Vue.prototype.$Geting = Geting
// Vue.Geting = Geting
// 文件流请求
Vue.prototype.$PostingBlob = PostingBlob
// Vue.PostingBlob = PostingBlob
// 文件流请求
Vue.prototype.$GetingBlob = GetingBlob
// Vue.GetingBlob = GetingBlob