const hasOwnProperty = (obj, key) => {
  return Object.hasOwnProperty.call(obj, key)
}

const getEffectName = (config) => {
  const { url, baseURL, method } = config;
  return `${method}${url.replace(baseURL, "")}`;
}

export { hasOwnProperty, getEffectName }