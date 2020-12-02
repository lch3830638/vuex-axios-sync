# vuex-axios-sync
在vuex中注册一个模块来同步axios请求的状态

## 使用

```
npm install vuex-axios-sync -S
```
or 
```
yarn add vuex-axios-sync -S
```

main.js
```
import syncVuexAxios from 'vuex-axios-sync'
import request from './utils/request' // axios instance
import store from  './store/' // vuex store instance

syncVuexAxios(store,request)
```

组件中使用
```
<script>
export default = {
  computed: {
    ...mapGetter('loading', ['global', 'effects'])
  }
}

</script>
```

支持自定义模块的名称（模块默认名称：loading）

```
syncVuexAxios(store, router, { moduleName: 'customName' } )
```

支持最小请求时间（默认为0）,单位毫秒

```
syncVuexAxios(store,router, { minRequestTime: 0 } )
```

## 如何工作
+ 在vuex中添加 loading 模块，初始state：
```
state = {
  global: false,
  effects: {}
}
```
+ 当发起一个网络请求时，在state.effects对象中添加一个属性（属性名：'`${method}${url}`'）

创建axios实例
```
import axios from 'axios'

const request = axios.create({baseURL: 'http://request.com'})

... // 设置拦截器、错误处理等操作

export default request
```

发起请求
```
import request from 'utils/request'

const getGoodsListURL = `/goodsList`
const getGoodsListKey = `get${getGoodsListURL}` // 在effects对象中的key
request({url:getGoodsListURL,method: 'GET'})
```
此时state：
```
state = {
  global: true,
  effects: {
    "get/goodsList": true
  }
}
```
+ 请求完成时的state
```
state = {
  global: false,
  effects: {
    "get/goodsList": false
  }
}
```

## 注意
+ axios会自动将HTTP请求方法转为小写（GET -> get）
```
request({url:getGoodsListURL,method: 'GET'}) // effects中的属性名为：'`get${getGoodsListURL}`'
```
+ 如果同时发起多个请求，所有请求都完成state.global = false，否则state.global = true