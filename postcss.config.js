module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 5, //制定`px`转换为视窗单位值的小数位数
      viewportUnit: 'vw',
      selectorBackList: ['ignore', 'tab-bar', 'tab-bar-item'], //制定不需要转换的类
      minPixelValue: 1,
      mediaQuery: false, //允许在媒体查询中转换'px'
      exclude: [/TabBar/]
    }
  }
}
