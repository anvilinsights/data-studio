import React from 'react'
import PropTypes from 'prop-types'

const PValue = ({ p, thresholdObj }) => {
  const pVal = parseFloat(p.toFixed(4))

  const { value, defaultValue } = thresholdObj
  const threshold = parseFloat(value || defaultValue)

  const isSignificant = pVal < threshold

  return (
    <div className="p-value-wrapper">
      <h3>{isSignificant ? 'Significant' : 'Not Significant'}</h3>
      <h4>
        p ({threshold}): {pVal}
      </h4>
    </div>
  )
}

PValue.propTypes = {
  p: PropTypes.number,
  thresholdObj: PropTypes.shape({
    value: PropTypes.string,
    defaultValue: PropTypes.string,
  }),
}

export default PValue
