import React from 'react'
import PropTypes from 'prop-types'

import * as stats from '../utils/stats'

const Campaign = ({ name, clicks, impressions, dataFrame }) => {
  const noAction = stats.notClicked(clicks, impressions)

  const colTotal = dataFrame.stat.sum('clicks')
  const rowTotal = stats.rowTotal(clicks, noAction)
  const grandTotal = dataFrame.stat.sum('impressions')

  const expected = stats.expected(rowTotal, colTotal, grandTotal)

  console.log('click column sum', dataFrame.stat.sum('clicks'))
  console.log('grand total', dataFrame.stat.sum('impressions'))
  console.log('rowTotal', stats.rowTotal(clicks, noAction))

  return (
    <tr role="row">
      <td role="cell">{name}</td>
      <td role="cell">{clicks.toLocaleString()}</td>
      <td role="cell">{noAction.toLocaleString()}</td>
      <td role="cell">{expected}</td>
    </tr>
  )
}

Campaign.propTypes = {
  name: PropTypes.string,
  clicks: PropTypes.number,
  impressions: PropTypes.number,
}

export default Campaign
