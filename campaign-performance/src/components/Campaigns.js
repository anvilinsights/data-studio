/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableRow from '@material-ui/core/TableRow'
import normalize from 'array-normalize'

import Campaign from './Campaign'
import { DataContext } from '../utils/DataContext'

const Campaigns = ({ pastTenseLabel, fontColor }) => {
  console.log('fontColor', fontColor)
  const { value: dataFrame } = React.useContext(DataContext)
  const pastTense = pastTenseLabel.value || pastTenseLabel.defaultValue
  const color = fontColor.value.color || fontColor.defaultValue

  const tableStyle = css`
    width: 1100px !important;
  `

  const exPct = dataFrame.select('expectedPercentage').toDict()
  const normalizedExpected = normalize(exPct['expectedPercentage'])

  // Convert from dataframe to key/val pairs
  const campList = dataFrame
    .toCollection()
    .map((x, i) => (
      <Campaign
        clicks={x.clicks}
        notClicked={x.notClicked}
        impressions={x.impressions}
        expected={x.expected}
        expectedPercentage={x.expectedPercentage}
        opacity={normalizedExpected[i]}
        name={x.name}
        fontColor={color}
        key={x.name}
      />
    ))

  const headerStyle = css`
    color: ${color} !important;
    font-weight: bold !important;
    font-size: 16px !important;
  `

  const subHeadStyle = css`
    color: #999;
    font-size: 12px;
    text-transform: uppercase;
    display: block;
    font-weight: normal;
  `

  const noSubHead = css`
    padding-bottom: 0px !important;
  `

  return (
    <Table role="table" css={tableStyle}>
      <TableHead role="rowgroup">
        <TableRow role="row">
          <TableCell
            role="columnheader"
            align="left"
            css={[headerStyle, noSubHead]}
          >
            Name
          </TableCell>
          <TableCell
            role="columnheader"
            align="left"
            css={[headerStyle, noSubHead]}
          >
            Impressions
          </TableCell>
          <TableCell role="columnheader" align="left" css={headerStyle}>
            <span css={subHeadStyle}>Actual</span> {pastTense}
          </TableCell>
          <TableCell role="columnheader" align="left" css={headerStyle}>
            <span css={subHeadStyle}>Expected</span> {pastTense}
          </TableCell>
          <TableCell role="columnheader" align="left" css={headerStyle}>
            <span css={subHeadStyle}>Performance</span> Conversions
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody role="rowgroup">{campList}</TableBody>
    </Table>
  )
}

Campaigns.propTypes = {
  campaigns: PropTypes.array,
}

export default Campaigns
