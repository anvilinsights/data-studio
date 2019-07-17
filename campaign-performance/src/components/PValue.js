import React from 'react'
import PropTypes from 'prop-types'

const PValue = ({ p, threshold, isSignificant }) => {
  const pVal = parseFloat(p.toFixed(4))

  return (
    <div className="p-value-wrapper">
      <h2>p: {pVal}</h2>
    </div>
  )
}

PValue.propTypes = {
  p: PropTypes.number,
  threshold: PropTypes.number,
  isSignificant: PropTypes.bool,
}

PValue.defaultProps = {
  threshold: 0.05,
  isSignificant: false,
}

export default PValue
