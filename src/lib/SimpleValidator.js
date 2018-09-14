class SimpleValidator {
  constructor() {
    this.cache = {}
  }

  static DEFAULT_RULES = {
    isNonEmpty: function (value, errorMsg) {
      if (value === '') {
        return errorMsg
      }
    },
    minLength: function (value, length, errorMsg) {
      if (value.length < length) {
        return errorMsg
      }
    }
  }

  static addRule(ruleName, ruleFunc) {
    SimpleValidator.DEFAULT_RULES[ruleName] = ruleFunc
  }

  add(model, name, rule, errorMsg) {
    var ary = rule.split(':')
    this.cache[name] = this.cache[name] || []
    this.cache[name].push(function () {
      var rule = ary.shift()
      ary.unshift(model)
      ary.push(errorMsg)
      return SimpleValidator.DEFAULT_RULES[rule].apply(null, ary)
    })
    return this
  }

  validate() {
    var errors = {}
    Object.keys(this.cache).forEach(key => {
      let msg = []
      let ret
      // eslint-disable-next-line
      for (let i = 0, func; func = this.cache[key][i++];) {
        (ret = func()) && msg.push(ret)
      }
      errors[key] = msg
    })
    return errors
  }
}

export default SimpleValidator
