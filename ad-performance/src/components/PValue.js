import React from 'react'
import PropTypes from 'prop-types'

const PValue = ({ pClicks, pConversions, thresholdObj, useConversionCols }) => {
  let pVal = useConversionCols ? pConversions : pClicks
  pVal = parseFloat(pVal.toFixed(4))

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
  pClicks: PropTypes.number,
  pConversions: PropTypes.number,
  thresholdObj: PropTypes.shape({
    value: PropTypes.string,
    defaultValue: PropTypes.string,
  }),
  useConversionCols: PropTypes.bool,
}

export default PValue
