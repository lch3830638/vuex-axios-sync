import Vue from 'vue'
import Vuex, { mapState } from 'vuex'
import request from './request'
import syncAxiosVuex from '../../index'

Vue.use(Vuex)
Vue.config.devtools = false

function run(options, done) {
  const moduleName = options.moduleName || 'loading'
  const minRequestTime = options.minRequestTime || 0
  const store = new Vuex.Store()
  const url = '/goods'
  const effectsName = `get${url}`
  request.interceptors.request.use((config) => {
    expect(moduleState.effects[effectsName]).toBe(true)
    expect(moduleState.global).toBe(true)
    expect(app.$el.textContent).toBe(`global:true,${effectsName}:true`)
    return config
  })
  syncAxiosVuex(store, request, options)
  const App = Vue.extend({
    computed: {
      ...mapState(moduleName, ['global', 'effects'])
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
    if (minRequestTime) {
      expect(moduleState.effects[effectsName]).toBe(true)
      expect(moduleState.global).toBe(true)
      expect(app.$el.textContent).toBe(`global:true,${effectsName}:true`)
      setTimeout(() => {
        expect(moduleState.effects[effectsName]).toBe(false)
        expect(moduleState.global).toBe(false)
        expect(app.$el.textContent).toBe(`global:false,${effectsName}:false`)
        done()
      }, minRequestTime)
    } else {
      expect(moduleState.effects[effectsName]).toBe(false)
      expect(moduleState.global).toBe(false)
      expect(app.$el.textContent).toBe(`global:false,${effectsName}:false`)
      done()
    }
  })
}

test('default usage', (done) => {
  run({}, done)
})

test('custom moduleName', (done) => {
  run({ moduleName: 'loadingStatus' }, done)
})

test('minRequstTime', (done) => {
  run({ minRequestTime: 400 }, done)
})
