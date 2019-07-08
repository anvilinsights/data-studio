import React from 'react'
import Campaign from './Campaign'

const Campaigns = props => {
  // return <div>test</div>
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
          <th role="columnheader">Impressions</th>
        </tr>
      </thead>
      <tbody role="rowgroup">{campList}</tbody>
    </table>
  )
}

export default Campaigns
