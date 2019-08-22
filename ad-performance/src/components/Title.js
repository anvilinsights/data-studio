import React from 'react'
import PropTypes from 'prop-types'

const Title = ({ text, defaultValue }) => {
  return <h2>{text || defaultValue}</h2>
}

Title.propTypes = {
  text: PropTypes.string,
  defaultValue: PropTypes.string,
}

export default Title
