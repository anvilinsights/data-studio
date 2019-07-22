/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import Color from 'color'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const Campaign = ({
  name,
  clicks,
  impressions,
  expected,
  expectedPercentage,
  opacity,
}) => {
  const baseColor = '#4da3eb'
  const basePadding = '10px'
  const multiplier = 0.27

  const adjustedColor =
    expectedPercentage > 1
      ? Color(baseColor).lighten(expectedPercentage * multiplier)
      : Color(baseColor).darken(expectedPercentage * multiplier)

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
    // opacity: ${opacity};
  `

  return (
    <TableRow role="row" css={rowStyle}>
      <TableCell role="cell" css={cellStyle}>
        {name}
      </TableCell>
      <TableCell role="cell" css={cellStyle} align="right">
        {clicks.toLocaleString()}
      </TableCell>
      <TableCell role="cell" css={cellStyle} align="right">
        {expected.toLocaleString()}
      </TableCell>
      <TableCell role="cell" css={cellStyle} align="right">
        {impressions.toLocaleString()}
      </TableCell>
      <TableCell role="cell" css={expectedStyle} align="right">
        {expectedPercentage.toFixed(3)}
      </TableCell>
    </TableRow>
  )
}

Campaign.propTypes = {
  name: PropTypes.string,
  clicks: PropTypes.number,
  impressions: PropTypes.number,
  notClicked: PropTypes.number,
  expected: PropTypes.number,
  expectedPercentage: PropTypes.number,
  opacity: PropTypes.number,
}

export default Campaign
