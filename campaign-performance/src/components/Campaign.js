import React from 'react'

const Campaigns = props => {
  return (
    <tr role="row">
      <td role="cell">{props.name}</td>
      <td role="cell">{props.clicks.toLocaleString()}</td>
      <td role="cell">{props.impressions.toLocaleString()}</td>
    </tr>
  )
}

export default Campaigns
