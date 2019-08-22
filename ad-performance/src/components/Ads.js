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

import Ad from './Ad'
import { DataContext } from '../utils/DataContext'

const Ads = props => {
  const { value: dataFrame } = React.useContext(DataContext)

  const tableStyle = css`
    width: 1100px !important;
  `

  // const exPct = dataFrame.select('expectedPercentage').toDict()
  // const normalizedExpected = normalize(exPct['expectedPercentage'])

  // Convert from dataframe to key/val pairs
  const adList = dataFrame
    .toCollection()
    .map((x, i) => (
      <Ad
        clicks={x.clicks}
        impressions={x.impressions}
        conversions={x.conversions}
        expected={x.expected}
        expectedPercentage={x.expectedPercentage}
        campaign={x.campaign}
        headline={x.headline}
        headline1={x.headline1}
        headline2={x.headline2}
        description={x.description}
        description1={x.description1}
        description2={x.description2}
        path1={x.path1}
        path2={x.path2}
        finalUrl={x.finalUrl}
        id={x.id}
        cost={x.cost}
        key={i}
      />
    ))

  return (
    <Table role="table" css={tableStyle}>
      <TableHead role="rowgroup">
        <TableRow role="row">
          <TableCell role="columnheader" align="left">
            Ad
          </TableCell>
          <TableCell role="columnheader" align="right">
            Impressions
          </TableCell>
          <TableCell role="columnheader" align="right">
            Clicks
          </TableCell>
          <TableCell role="columnheader" align="right">
            Conversions
          </TableCell>
          <TableCell role="columnheader" align="right">
            Expected Clicks
          </TableCell>
          <TableCell role="columnheader" align="right">
            Performance
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody role="rowgroup">{adList}</TableBody>
    </Table>
  )
}

Ads.propTypes = {
  ads: PropTypes.array,
}

export default Ads
