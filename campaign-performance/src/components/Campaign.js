import React from 'react'
import PropTypes from 'prop-types'

import { notClicked } from '../utils/stats'

const Campaign = ({ name, clicks, impressions }) => {
  const noAction = notClicked(clicks, impressions)

  return (
    <tr role="row">
      <td role="cell">{name}</td>
      <td role="cell">{clicks.toLocaleString()}</td>
      <td role="cell">{noAction.toLocaleString()}</td>
    </tr>
  )
}

Campaign.propTypes = {
  name: PropTypes.string,
  clicks: PropTypes.number,
  impressions: PropTypes.number,
}

export default Campaign
