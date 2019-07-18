const chiSquaredTest = require('chi-squared-test')

module.exports = {
  expected: function(rowTotal, columnTotal, grandTotal) {
    return parseFloat(((rowTotal * columnTotal) / grandTotal).toFixed(1))
  },

  notClicked: function(clicked, impressions) {
    return impressions - clicked
  },

  rowTotal: function(clicked, notClicked) {
    return clicked + notClicked
  },

  pValue: function(observed, expected, reduction = 1) {
    const { probability } = chiSquaredTest(observed, expected, reduction)
    return probability
  },

  expectedPercentage: function(expected, actual) {
    return (actual / expected) * 100
  },
}
