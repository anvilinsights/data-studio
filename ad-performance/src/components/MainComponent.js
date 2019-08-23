/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import Ads from './Ads'
import Title from './Title'
import PValue from './PValue'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import { DataContext } from '../utils/DataContext'

const MainComponent = props => {
  if (!props.fields || !props.tables || !props.tables.DEFAULT) {
    return <div>Loading...</div>
  }

  const [useConversionCols, toggleConversionCols] = React.useState(false)

  const switchStyle = css`
    padding: 20px;
  `
  const pValStyle = css`
    float: left;
    width: 800px;
    padding: 20px;
  `

  return (
    <React.Fragment>
      <div css={pValStyle}>
        <Title
          text={props.style.title.value}
          defaultValue={props.style.title.defaultValue}
        />
        <PValue
          pClicks={props.pValueClicks}
          pConversions={props.pValueConversions}
          useConversionCols={useConversionCols}
          thresholdObj={props.style.significanceThreshold}
        />
      </div>

      <div css={switchStyle}>
        <FormControlLabel
          control={
            <Switch
              checked={useConversionCols}
              onChange={() => toggleConversionCols(!useConversionCols)}
              value="conversionCols"
              color="primary"
            />
          }
          label={`Predictions: ${useConversionCols ? 'Conversions' : 'Clicks'}`}
        />
      </div>

      <Ads useConversionCols={useConversionCols} />
    </React.Fragment>
  )
}

export default MainComponent
