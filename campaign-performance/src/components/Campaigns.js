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

const Campaigns = props => {
  const { value: dataFrame } = React.useContext(DataContext)

  const tableStyle = css`
    width: 650px !important;
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
        key={x.name}
      />
    ))

  return (
    <Table role="table" css={tableStyle}>
      <TableHead role="rowgroup">
        <TableRow role="row">
          <TableCell role="columnheader" align="left">
            Name
          </TableCell>
          <TableCell role="columnheader" align="right">
            Impressions
          </TableCell>
          <TableCell role="columnheader" align="right">
            Clicks
          </TableCell>
          <TableCell role="columnheader" align="right">
            Expected
          </TableCell>
          <TableCell role="columnheader" align="right">
            Act vs. Exp
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
