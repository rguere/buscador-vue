// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/buscador/'
    : '/',
  outputDir: 'dist/buscador' 
}