/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import PerformanceCell from './PerformanceCell'

const Campaign = ({
  name,
  clicks,
  impressions,
  expected,
  expectedPercentage,
  fontColor,
}) => {
  const cellStyle = css`
    color: ${fontColor} !important;
    border-bottom: none !important;
    font-size: 18px !important;
    line-height: 0.5 !important;
    padding: 6px 40px 6px 16px !important;
  `

  const impressionStyle = css`
    border-right: solid 1px #ddd;
  `

  return (
    <TableRow role="row">
      <TableCell role="cell" css={cellStyle}>
        {name}
      </TableCell>
      <TableCell role="cell" align="left" css={[impressionStyle, cellStyle]}>
        {impressions.toLocaleString()}
      </TableCell>
      <TableCell role="cell" align="left" css={cellStyle}>
        {clicks.toLocaleString()}
      </TableCell>
      <TableCell role="cell" align="left" css={cellStyle}>
        {expected.toLocaleString()}
      </TableCell>
      <TableCell role="cell" align="left" css={cellStyle}>
        <PerformanceCell value={expectedPercentage.toFixed(2)} />
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
  fontColor: PropTypes.string,
}

export default Campaign
