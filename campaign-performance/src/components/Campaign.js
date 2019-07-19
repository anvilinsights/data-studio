/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'

import { expectedPercentage } from '../utils/stats'

const Campaign = ({ name, clicks, notClicked, expected }) => {
  const exPct = expectedPercentage(expected, clicks)
  const padded = css`
    background: #dfdfdf;
    padding: 5px;
  `

  return (
    <tr role="row">
      <td role="cell">{name}</td>
      <td role="cell" align="right">
        {clicks.toLocaleString()}
      </td>
      <td role="cell" align="right">
        {expected.toLocaleString()}
      </td>
      <td role="cell" align="right">
        {notClicked.toLocaleString()}
      </td>
      <td role="cell" css={padded} align="right">
        {exPct.toFixed(3)}
      </td>
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
