import React from 'react'
import Campaigns from './Campaigns'

const MainComponent = props => {
  if (!props.fields || !props.tables || !props.tables.DEFAULT) {
    return <div>loading...</div>
  }
  return <Campaigns campaigns={props.tables.DEFAULT} />
}

export default MainComponent
