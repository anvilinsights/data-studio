module.exports = {
  expected: function() {
    console.log('expected')
  },

  notClicked: function(clicked, impressions) {
    return impressions - clicked
  },
}
