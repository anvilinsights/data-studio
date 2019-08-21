/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import Campaigns from './Campaigns'
import Title from './Title'
import SignificanceAlert from './SignificanceAlert'
import InfoPopover from './InfoPopover'

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
    position: relative;
  `

  const popoverHeader = css`
    padding: 0;
    margin: 0 0 10px 0;
    font-size: 13px;
    display: block;
    font-weight: bold;
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
      <InfoPopover
        placement="left-end"
        iconColor="#fff"
        arrowOffset={110}
        offset={50}
      >
        <span css={popoverHeader}>About StatsAnalyzer</span>
        This tool works using a statistical method called Chi-Squared.
        Chi-Squared allows you to test for a relationship between categorical
        data (like colors, sports teams, or flavors of ice cream). It might have
        two outcomes. To learn more, click&nbsp;
        <a
          target="_blank"
          href="https://datastudio.google.com/reporting/1XZX9PnT94yESZAB-LUUctOj8kL5c-XMl/page/AyGu"
        >
          here
        </a>
        .
      </InfoPopover>
    </div>
  )
}

export default MainComponent
