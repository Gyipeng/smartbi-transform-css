const postcss = require('postcss')
const { replaceStr } = require('../src/utils')

module.exports = postcss.plugin('smartbi-transform-css', function (opts = {}) {
  const { prefix = 'el-', replace = 'ka-' } = opts || {}
  
  function plugin(css, result) {
    css.walkRules((rule) => {
      const { selector } = rule
      if (
        selector.includes(prefix) &&
        !selector.includes(replace)
      ) {
        const clone = rule.clone()
        clone.selector = replaceStr(selector, prefix, replace)
        rule.replaceWith(clone)
      }
    })
  }

  return plugin
})