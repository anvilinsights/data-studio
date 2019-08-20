/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import Campaigns from './Campaigns'
import Title from './Title'
import SignificanceAlert from './SignificanceAlert'

const MainComponent = props => {
  if (!props.fields || !props.tables || !props.tables.DEFAULT) {
    return <div>Loading...</div>
  }

  const { widgetBackgroundColor } = props.style
  const backgroundColor =
    widgetBackgroundColor.value.color || widgetBackgroundColor.defaultValue

  const widgetStyles = css`
    background: ${backgroundColor};
    padding: 20px;
    border-radius: 5px;
  `

  return (
    <div css={widgetStyles}>
      <SignificanceAlert
        p={props.pValue}
        background={props.style.alertBackgroundColor}
        font={props.style.alertFontColor}
      />
      <Title
        subtitle={props.style.subtitle.value}
        override={props.style.baseMetric.value}
        defaultValue={props.fields.metricID[0].name}
        fontColor={props.style.tableFontColor}
      />
      <Campaigns
        pastTenseLabel={props.style.baseMetricPastTense}
        fontColor={props.style.tableFontColor}
      />
    </div>
  )
}

export default MainComponent
