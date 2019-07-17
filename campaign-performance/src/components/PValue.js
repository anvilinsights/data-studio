import React from 'react'
import PropTypes from 'prop-types'

const PValue = ({ p, threshold }) => {
  const pVal = parseFloat(p.toFixed(4))
  const isSignificant = pVal > threshold

  return (
    <div className="p-value-wrapper">
      <h2>
        p ({threshold}): {pVal}
      </h2>

      <h4>Significant: {isSignificant ? 'Yes' : 'No'}</h4>
    </div>
  )
}

PValue.propTypes = {
  p: PropTypes.number,
  threshold: PropTypes.number,
}

PValue.defaultProps = {
  threshold: 0.05,
}

export default PValue
