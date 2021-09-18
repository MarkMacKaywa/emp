const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const globby = require('globby')
const fs = require('fs-extra')
const {resolveApp} = require('./paths')
const entryConfig = function (config, paths, cwd, src, srcKey, op, isMinify) {
  const entryName = src.split('.')[0].replace(/\//gi, '_')
  const chunks = srcKey.replace(/\//gi, '_')
  const filename = `${srcKey}.html`
  config.entry(chunks).add(path.join(paths.appRoot, src)).end()
  const htmlOption = {
    title: '',
    template: paths.template,
    favicon: paths.favicon,
    files: {},
    filename,
    chunks: [chunks],
    minify: getMinifyOp(isMinify),
    ...op,
  }
  config.plugin(`html_${entryName}`).use(HtmlWebpackPlugin, [htmlOption])
}
const multiEntriesByConfig = function (config, paths, entries, cwd, isMinify) {
  cwd = cwd || 'src/pages'
  // cwd = resolveApp(cwd)
  // console.log(cwd)
  // if (!fs.existsSync(cwd)) return console.error('[EMP] 多入口 不存在当前文件夹')
  const pathsrcs = globby.sync(cwd)
  pathsrcs.map(src => {
    const srcKey = src.replace(`${cwd}/`, '').split('.')[0]
    const op = entries[srcKey] || {}
    entryConfig(config, paths, cwd, src, srcKey, op, isMinify)
    console.log(`[EMP] 多入口生成 ${src}`)
  })
}
const getMinifyOp = function (isMinify) {
  return isMinify
    ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    : false
}
module.exports = {multiEntriesByConfig, getMinifyOp}
