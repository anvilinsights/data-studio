/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import Color from 'color'

import { expectedPercentage } from '../utils/stats'

const Campaign = ({ name, clicks, notClicked, expected }) => {
  const exPct = expectedPercentage(expected, clicks)

  const baseColor = '#4da3eb'
  const basePadding = '10px'
  const multiplier = 0.15

  const adjustedColor =
    exPct > 1
      ? Color(baseColor).lighten(exPct * multiplier)
      : Color(baseColor).darken(exPct * multiplier)

  const expectedStyle = css`
    background: #999;
    padding: ${basePadding};
  `

  const rowStyle = css`
    background: ${adjustedColor.hsl().string()};
    color: ${adjustedColor.isLight() ? '#000' : '#333'};
  `

  const cellStyle = css`
    padding: ${basePadding};
  `

  return (
    <tr role="row" css={rowStyle}>
      <td role="cell" css={cellStyle}>
        {name}
      </td>
      <td role="cell" css={cellStyle} align="right">
        {clicks.toLocaleString()}
      </td>
      <td role="cell" css={cellStyle} align="right">
        {expected.toLocaleString()}
      </td>
      <td role="cell" css={cellStyle} align="right">
        {notClicked.toLocaleString()}
      </td>
      <td role="cell" css={expectedStyle} align="right">
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
