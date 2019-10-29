const nlp = require('compromise')

module.exports = {
  pastTense(metric) {
    const doc = nlp(metric)

    switch (metric) {
      case 'clicks':
        return 'clicked'
      default:
        return doc
          .verbs()
          .toPastTense()
          .out()
    }
  },
}
