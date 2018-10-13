/* eslint-disable */
/*
WEBPACK OVERRIDES (using react-app-rewired and customize-cra)
*/
const path = require('path')
const { injectBabelPlugin } = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')
const rewireSass = require('react-app-rewire-scss')
const rewireCssModules = require('@watiko/react-app-rewire-css-modules')
const antdTheme = require('./antd')

module.exports = function override (config, env) {
  const isProduction = process.env.NODE_ENV === 'production'
  /*
  BABEL:
  babel-plugin-import:          Required by antd for tree shaking
  transform-decorators-legacy:  @decorator support, very nice
  */
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], config)
  config = injectBabelPlugin(['transform-decorators-legacy', {}], config)

  /*
  WEBPACK LOADERS:
  LESS:                         Used by antd, loader options set the theme colors
  SASS:                         Awesome stylesheets
  CSS MODULES:                  Modular, per-component hashed styles
  */
  config = rewireLess.withLoaderOptions({
     modifyVars: antdTheme,
     javascriptEnabled: true
   })(config, env)
  config = rewireSass(config, env)
  config = rewireCssModules(config, env)

  // Return a customized copy of the CRA webpack config.
  return config
}

