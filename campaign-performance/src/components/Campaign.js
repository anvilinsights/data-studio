import React from 'react'
import PropTypes from 'prop-types'

import { expectedPercentage } from '../utils/stats'

const Campaign = ({ name, clicks, notClicked, expected }) => {
  const exPct = expectedPercentage(expected, clicks)

  return (
    <tr role="row">
      <td role="cell">{name}</td>
      <td role="cell">{clicks.toLocaleString()}</td>
      <td role="cell">{notClicked.toLocaleString()}</td>
      <td role="cell">{expected.toLocaleString()}</td>
      <td role="cell">{exPct.toLocaleString()}</td>
    </tr>
  )
}

Campaign.propTypes = {
  name: PropTypes.string,
  clicks: PropTypes.number,
  impressions: PropTypes.number,
  notClicked: PropTypes.number,
  expected: PropTypes.number,
}

export default Campaign
