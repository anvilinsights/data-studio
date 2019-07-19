import React from 'react'
import PropTypes from 'prop-types'

import Campaign from './Campaign'
import { DataContext } from '../utils/DataContext'

const Campaigns = props => {
  const { value: dataFrame } = React.useContext(DataContext)

  // Convert from dataframe to key/val pairs
  const campList = dataFrame
    .toCollection()
    .map(x => (
      <Campaign
        clicks={x.clicks}
        notClicked={x.notClicked}
        impressions={x.impressions}
        expected={x.expected}
        name={x.name}
        key={x.name}
      />
    ))

  return (
    <table role="table">
      <thead role="rowgroup">
        <tr role="row">
          <th role="columnheader" align="left">
            Name
          </th>
          <th role="columnheader">Clicks</th>
          <th role="columnheader">Expected</th>
          <th role="columnheader">Not Clicked</th>
          <th role="columnheader">Act vs. Exp</th>
        </tr>
      </thead>
      <tbody role="rowgroup">{campList}</tbody>
    </table>
  )
}

Campaigns.propTypes = {
  campaigns: PropTypes.array,
}

export default Campaigns
