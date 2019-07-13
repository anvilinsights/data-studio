import React from 'react'
import Campaigns from './Campaigns'
import Title from './Title'

const MainComponent = props => {
  if (!props.fields || !props.tables || !props.tables.DEFAULT) {
    return <div>loading...</div>
  }

  const { dataFrame } = props

  return (
    <React.Fragment>
      <Title
        text={props.style.title.value}
        defaultValue={props.style.title.defaultValue}
      />
      <Campaigns campaigns={props.tables.DEFAULT} dataFrame={dataFrame} />
    </React.Fragment>
  )
}

export default MainComponent
