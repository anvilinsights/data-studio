module.exports = {
  expected: function(rowTotal, columnTotal, grandTotal) {
    return ((rowTotal * columnTotal) / grandTotal).toFixed(1)
  },

  notClicked: function(clicked, impressions) {
    return impressions - clicked
  },

  rowTotal: function(clicked, notClicked) {
    return clicked + notClicked
  },
}
