module.exports = {
    plugins: {
      'postcss-pxtorem': {
        rootValue : ({ file }) => ((/vant/i.test(file) || /github-markdown/i.test(file)) ? 37.5 :75),
        propList: ['*']
      }
    }
  }