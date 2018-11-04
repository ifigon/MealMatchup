/* eslint-disable */
/*
WEBPACK OVERRIDES (using react-app-rewired and customize-cra)
*/
const path = require('path')
const { injectBabelPlugin } = require('react-app-rewired')
const rewireSass = require('react-app-rewire-scss')
const rewireCssModules = require('@watiko/react-app-rewire-css-modules')

module.exports = function override (config, env) {
  const isProduction = process.env.NODE_ENV === 'production'
  /*
  BABEL:
  babel-plugin-import:          Required by antd for tree shaking
  transform-decorators-legacy:  @decorator support, very nice
  (NOTE: babel-preset-stage-3 is implicitly loaded by react-geocode as an unmarked peer dependency)
  */
  config = injectBabelPlugin(['lodash', {}], config)
  config = injectBabelPlugin(['transform-decorators-legacy', {}], config)

  /*
  WEBPACK LOADERS:
  SASS:                         Awesome stylesheets
  CSS MODULES:                  Modular, per-component hashed styles
  */
  config = rewireSass(config, env)
  config = rewireCssModules(config, env)

  // Return a customized copy of the CRA webpack config.
  return config
}

