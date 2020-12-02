import { hasOwnProperty, getEffectName, getRequestTime } from './utils'

const syncAxiosVuex = (store, axios, option = {}) => {
  const moduleName = option.moduleName || "loading";
  const minRequestTime = option.minRequestTime || 0;
  let requestStartTime = 0
  store.registerModule(moduleName, {
    namespaced: true,
    state: {
      effects: {},
      global: false
    },
    getters: {
      global: state => state.global,
      effects: state => state.effects,
    },
    mutations: {
      REQUEST: (state, { effectName }) => {
        if (hasOwnProperty(state.effects, effectName)) {
          state.effects[effectName] = true
        } else {
          state.effects = {
            ...state.effects,
            [effectName]: true
          }
        }
        state.global = true;
      },
      RESPONSE: (state, { effectName }) => {
        state.effects[effectName] = false
        const effect = Object.keys(state.effects).find(key => state.effects[key])
        if (!effect) {
          state.global = false
        }
      }
    }
  });

  axios.interceptors.request.use(config => {
    requestStartTime = new Date().getTime()
    const effectName = getEffectName(config);
    store.commit(`${moduleName}/REQUEST`, { effectName });
    return config;
  });

  const requestComplete = config => {
    const requestTime = getRequestTime(requestStartTime)
    const effectName = getEffectName(config);
    if (minRequestTime) {
      setTimeout(() => {
        store.commit(`${moduleName}/RESPONSE`, { effectName });
      }, delay())
    } else {
      store.commit(`${moduleName}/RESPONSE`, { effectName });
    }

    function delay() {
      return requestTime > minRequestTime ? 0 : minRequestTime - requestTime
    }
  };

  axios.interceptors.response.use(res => {
    requestComplete(res.config);
    return res;
  }, error => {
    requestComplete(error.config);
    return Promise.reject(error);
  });
  axios.interceptors.response.handlers = axios.interceptors.response.handlers.reverse();
};

export default syncAxiosVuex;
