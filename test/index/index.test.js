import Vue from 'vue'
import Vuex, { mapGetters } from 'vuex'
import request from './request'
import syncAxiosVuex from '../../src/index'

Vue.use(Vuex)
Vue.config.devtools = false

function run(originModuleName, done) {
  const moduleName = originModuleName || 'loading'
  const store = new Vuex.Store()
  const url = '/goods'
  const effectsName = `get${url}`
  request.interceptors.request.use((config) => {
    expect(moduleState.effects[effectsName]).toBe(true)
    expect(moduleState.global).toBe(true)
    expect(app.$el.textContent).toBe(`global:true,${effectsName}:true`)
    return config
  })

  syncAxiosVuex(store, request, { moduleName: originModuleName })
  const App = Vue.extend({
    computed: {
      ...mapGetters(moduleName, ['global', 'effects'])
    },
    render(h) {
      return h('div', [`global:${this.global},${effectsName}:${this.effects[effectsName]}`])
    }
  })
  const app = new Vue({
    store,
    render: h => h(App)
  }).$mount()
  expect(app.$el.textContent).toBe(`global:false,${effectsName}:undefined`)
  const moduleState = store.state[moduleName]
  return request({ url }).then(() => {
    expect(moduleState.effects[effectsName]).toBe(false)
    expect(moduleState.global).toBe(false)
    expect(app.$el.textContent).toBe(`global:false,${effectsName}:false`)
    done()
  })
}

test('default usage', (done) => {
  run('', done)
})

test('custom moduleName', (done) => {
  run('loadingStatus', done)
})
