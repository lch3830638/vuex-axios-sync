const hasOwnProperty = (obj, key) => {
  return Object.hasOwnProperty.call(obj, key)
}

const getEffectName = (config) => {
  const { url, baseURL, method } = config;
  const notQueryURL = url.split('?')[0]
  return `${method.toLowerCase()}${notQueryURL.replace(baseURL, "")}`;
}

const getRequestTime = (startTime) => {
  return new Date().getTime() - startTime
}

export { hasOwnProperty, getEffectName, getRequestTime }