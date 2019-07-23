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
  const positiveColor = '#246EB9'
  const negativeColor = '#F06543'
  // const multiplier = 0.5

  /*
  dark blue: #0279C7
  */

  const adjustedColor =
    expectedPercentage > 0
      ? Color(positiveColor).darken(expectedPercentage)
      : Color(negativeColor).darken(expectedPercentage)

  const expectedStyle = css`
    background: #999;
  `

  const cellStyle = css`
    // opacity: ${opacity};
  `

  const colorStyle = css`
    background: ${adjustedColor.hsl().string()};
    color: ${adjustedColor.isLight() ? '#000' : '#dfdfdf'} !important;
  `

  return (
    <TableRow role="row">
      <TableCell role="cell" css={cellStyle}>
        {name}
      </TableCell>
      <TableCell role="cell" css={cellStyle} align="right">
        {impressions.toLocaleString()}
      </TableCell>
      <TableCell role="cell" css={cellStyle} align="right">
        {clicks.toLocaleString()}
      </TableCell>
      <TableCell role="cell" css={colorStyle} align="right">
        {expected.toLocaleString()}
      </TableCell>
      <TableCell role="cell" css={colorStyle} align="right">
        {expectedPercentage.toFixed(2)}
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
