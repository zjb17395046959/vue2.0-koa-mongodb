import axios from 'axios';

// 不同环境，不同的axios路径
if(process.env.NODE_ENV=='development'){//本地环境
    axios.defaults.baseURL = 'http://localhost:3000';
}else if(process.env.NODE_ENV=='production'){//生产环境
    axios.defaults.baseURL = 'http://localhost:3000';
}else if(process.env.NODE_ENV=='test'){//测试环境
    axios.defaults.baseURL = 'http://localhost:3000';
}
// 请求超时时间
axios.defaults.timeout = 10000;

//post 请求的时候，需要加上一个默认的请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//请求拦截
axios.interceptors.request.use(
    config=>{
        // 获取本地数据是否有token
        const token = localStorage.getItem('token');
        // 返回一个true或者false，有token并且请求数据的时候，请求头携带token
        token&&(config.headers.Authorization = token);
        return config;
    },
    error =>{
        return Promise.error(error);
    }
);

//响应拦截
axios.interceptors.response.use(
    response=>{
        if(response.status == 200){
            return Promise.resolve(response);
        }else{
            return Promise.reject(response);
        }
    },
    error=>{
        if(error.response.status){//这里是返回的code值对应操作
            switch (error.response.status) {
                case 401:
                    console.log('未登录');
                    break;
                case 404:
                    console.log('网络错误！');
                    break;
                default:
                    console.log(error.response.data.message);
                    break;
            }
            return Promise.reject(error.response);
        }
    }
);

//封装get请求的方法
export function getApi(url,params){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:params
        }).then(res=>{
            resolve(res);
        }).catch(msg=>{
            reject(msg);
        });
    });
}

//封装post请求的方法
export function postApi(url,params){
    return new Promise((resolve,reject)=>{
        // JSON.stringify(params)不使用的话，后台接受不到我们传递的数据
        axios.post(url,JSON.stringify(params)).then(res=>{
            resolve(res);
        }).catch(msg=>{
            reject(msg);
        });
    });
}
// 前台调用
//  var res =await getApi('/home/a');
// console.log(res);