import React from 'react'
import Campaigns from './Campaigns'
import Title from './Title'
import PValue from './PValue'

import { DataContext } from '../utils/DataContext'

const MainComponent = props => {
  if (!props.fields || !props.tables || !props.tables.DEFAULT) {
    return <div>loading...</div>
  }

  return (
    <React.Fragment>
      <Title
        text={props.style.title.value}
        defaultValue={props.style.title.defaultValue}
      />
      <PValue p={props.pValue} />
      <Campaigns />
    </React.Fragment>
  )
}

export default MainComponent
