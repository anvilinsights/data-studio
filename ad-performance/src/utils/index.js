module.exports = {
  exists: function(value) {
    return value && value != '--'
  },
  percent: function(num) {
    if (isNaN(num)) {
      return '--'
    } else {
      return `${num}%`
    }
  },
}
