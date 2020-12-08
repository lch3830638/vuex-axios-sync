(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["syncAxiosVuex"] = factory();
	else
		root["syncAxiosVuex"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


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
      REQUEST: (state, effectName) => {
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["hasOwnProperty"])(state.effects, effectName)) {
          state.effects[effectName] = true
        } else {
          state.effects = {
            ...state.effects,
            [effectName]: true
          }
        }
        state.global = true;
      },
      RESPONSE: (state, effectName) => {
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
    const effectName = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getEffectName"])(config);
    store.commit(`${moduleName}/REQUEST`, effectName);
    return config;
  });

  const requestComplete = config => {
    const requestTime = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRequestTime"])(requestStartTime)
    const effectName = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getEffectName"])(config);
    if (minRequestTime) {
      setTimeout(() => {
        store.commit(`${moduleName}/RESPONSE`, effectName);
      }, delay())
    } else {
      store.commit(`${moduleName}/RESPONSE`, effectName);
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

/* harmony default export */ __webpack_exports__["default"] = (syncAxiosVuex);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasOwnProperty", function() { return hasOwnProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEffectName", function() { return getEffectName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRequestTime", function() { return getRequestTime; });
const hasOwnProperty = (obj, key) => {
  return Object.hasOwnProperty.call(obj, key)
}

const getEffectName = (config) => {
  const { url, baseURL, method } = config;
  const notQueryURL = url.split('?')[0]
  return `${method}${notQueryURL.replace(baseURL, "")}`;
}

const getRequestTime = (startTime) => {
  return new Date().getTime() - startTime
}



/***/ })
/******/ ])["default"];
});