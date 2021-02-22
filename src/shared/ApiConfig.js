/*
内容：接口的配置
作者：https://www.jianshu.com/p/a5d7eb6d58d3
*/

import axios from 'axios'
import qs from 'qs'

let baseURL = 'http://localhost:8888/OA_back_war_exploded/';
//process.env.NODE_ENV环境 development开发环境        测试环境.....
// if (process.env.NODE_ENV === 'development') {
//     baseURL = 'http://132.232.87.95:3000/api'
// } else {
//     baseURL = 'http://132.232.87.95:3000/api'
// }
//将URL地址前面相同的一段封装
const $http = axios.create({
    baseURL: baseURL
})
function toChange(code) {
    window.location.href="/"+code;
}
// 封装get
export const get = (url, params) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        $http.get(url, {
            params,
        },{headers:{'Content-Type':'application/json; charset=UTF-8','token':localStorage.getItem('token')}}).then(res => {
            // console.log(res);
            if (res.status === 200) {
                resolve(res.data)
            } else {
                alert(res.data.code)
            }
        }).catch(err => {
            var chartemp=err+'';
            var code =chartemp.substring(chartemp.length, chartemp.length-3);

            // toChange(code);
        })
    })
}
//封装post
export const post = (url, params) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        $http.post(url,
            params,
          {headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              //'Content-Type': 'application/json',
              'token':localStorage.getItem('token')
            }

          }
        ).then(res => {
            if (res.status === 200) {
                resolve(res.data)
            } else {
                alert(res.data.code)
            }
        }).catch(err => {
            var chartemp=err+'';
            var code =chartemp.substring(chartemp.length, chartemp.length-3);

            // toChange(code);
        })
    })
}
//封装put
export const put = (url, params) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        $http.put(url,
            params
        ).then(res => {
            // console.log(res.data);
            resolve(res.data)
        }).catch(err => {
            alert(err)
        })
    })
}
//封装delete
export const del = (url, params) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        $http.delete(url,
            {params}
        ).then(res => {
            // alert("res"+res);
            resolve(res.data)
        }).catch(err => {
            alert(err)
        })
    })
}
