import React from 'react'
import PropTypes from 'prop-types'

const Campaign = ({ name, clicks, notClicked, expected }) => {
  return (
    <tr role="row">
      <td role="cell">{name}</td>
      <td role="cell">{clicks.toLocaleString()}</td>
      <td role="cell">{notClicked.toLocaleString()}</td>
      <td role="cell">{expected.toLocaleString()}</td>
    </tr>
  )
}

Campaign.propTypes = {
  name: PropTypes.string,
  clicks: PropTypes.number,
  impressions: PropTypes.number,
  notClicked: PropTypes.number,
  expected: PropTypes.number,
}

export default Campaign
