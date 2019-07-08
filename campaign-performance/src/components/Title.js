import React from 'react'
import PropTypes from 'prop-types'

const Title = ({ text, defaultValue }) => {
  const titleText = text == '' ? defaultValue : text
  return <h3>{titleText}</h3>
}

Title.propTypes = {
  text: PropTypes.string,
  defaultValue: PropTypes.string,
}

export default Title
