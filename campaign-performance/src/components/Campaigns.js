import React from 'react'
import PropTypes from 'prop-types'

import Campaign from './Campaign'

const Campaigns = props => {
  const campList = props.campaigns.map(x => (
    <Campaign
      clicks={x.metricID[0]}
      impressions={x.metricID[1]}
      name={x.dimID[0]}
      key={x.dimID[0]}
    />
  ))

  return (
    <table role="table">
      <thead role="rowgroup">
        <tr role="row">
          <th role="columnheader">Name</th>
          <th role="columnheader">Clicks</th>
          <th role="columnheader">Not Clicked</th>
          <th role="columnheader">Expected Clicks</th>
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
