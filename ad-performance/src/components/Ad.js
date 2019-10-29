/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import Color from 'color'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Path from './Path'
import PerformanceCell from './PerformanceCell'
import { exists, percent } from '../utils'

const Ad = ({
  clicks,
  impressions,
  conversions,
  headline,
  headline1,
  headline2,
  description,
  description1,
  description2,
  path1,
  path2,
  finalUrl,
  id,
  expectedClicks,
  expectedClicksPercentage,
  expectedConversions,
  expectedConversionsPercentage,
  cost,
  ctr,
  conversionRate,
  conversionsPerImpression,
  useConversionCols,
}) => {
  const positiveColor = '#246EB9'
  const negativeColor = '#F06543'
  // const expectedPercentage = 0
  const opacity = 0

  const adjustedColor =
    expectedClicksPercentage > 0
      ? Color(positiveColor).darken(expectedClicksPercentage)
      : Color(negativeColor).darken(expectedClicksPercentage)

  const expectedStyle = css`
    background: #999;
  `

  const cellStyle = css`
    padding: 6px 20px 6px 16px !important;
    width: 400px;
  `

  const adStyle = css`
    line-height: 1.1em !important;
  `

  const colorStyle = css`
    background: ${adjustedColor.hsl().string()};
    color: ${adjustedColor.isLight() ? '#000' : '#dfdfdf'} !important;
  `

  const descriptionStyle = css`
    color: grey;
    font-size: 12px;
    padding: 0;
    margin: 0;
  `

  const linkStyle = css`
    color: #5881d8;
  `

  const headlineStyle = css`
    margin-bottom: 0px;
    margin-top: 0;
    font-size: 14px;
    font-weight: bold;
    display: block;
  `

  const accordionStyles = css`
    padding: 0px;
  `

  return (
    <TableRow role="row">
      <TableCell role="cell" css={cellStyle}>
        <ExpansionPanel
          css={accordionStyles}
          TransitionProps={{ unmountOnExit: true }}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            id="panel-header"
          >
            <Typography css={adStyle}>
              <span css={headlineStyle}>
                {headline} {exists(headline1) && <span>{headline1}</span>}
              </span>
              {exists(headline2) && (
                <span css={headlineStyle}>{headline2}</span>
              )}
              <Path path1={path1} path2={path2} />
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography css={adStyle}>
              {exists(description) && (
                <span css={descriptionStyle}>{description}</span>
              )}
              {exists(description1) && (
                <span css={descriptionStyle}>{description1}</span>
              )}
              {exists(description2) && (
                <p css={descriptionStyle}>{description2}</p>
              )}

              {exists(finalUrl) && (
                <p css={[descriptionStyle, linkStyle]}>{finalUrl}</p>
              )}
              {exists(id) && <p css={descriptionStyle}>ID: {id}</p>}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </TableCell>
      <TableCell role="cell" css={cellStyle} align="right">
        {impressions.toLocaleString()}
      </TableCell>
      <TableCell role="cell" css={cellStyle} align="right">
        {percent(ctr.toFixed(1))}
      </TableCell>
      <TableCell role="cell" css={cellStyle} align="right">
        {percent(conversionRate.toFixed(1))}
      </TableCell>
      <TableCell role="cell" css={cellStyle} align="right">
        {percent(conversionsPerImpression.toFixed(1))}
      </TableCell>
      <TableCell role="cell" css={cellStyle} align="right">
        {clicks.toLocaleString()}
      </TableCell>
      <TableCell role="cell" css={cellStyle} align="right">
        {conversions.toLocaleString()}
      </TableCell>
      {!useConversionCols && (
        <TableCell role="cell" css={colorStyle} align="right">
          {expectedClicks.toFixed(2)}
        </TableCell>
      )}
      {!useConversionCols && (
        <TableCell role="cell" css={colorStyle} align="right">
          <PerformanceCell value={expectedClicksPercentage} />
        </TableCell>
      )}
      {useConversionCols && (
        <TableCell role="cell" css={colorStyle} align="right">
          {expectedConversions.toFixed(2)}
        </TableCell>
      )}
      {useConversionCols && (
        <TableCell role="cell" css={colorStyle} align="right">
          <PerformanceCell value={expectedConversionsPercentage} />
        </TableCell>
      )}
    </TableRow>
  )
}

Ad.propTypes = {
  campaign: PropTypes.string,
  clicks: PropTypes.number,
  impressions: PropTypes.number,
  notClicked: PropTypes.number,
  conversions: PropTypes.number,
  cost: PropTypes.number,
  headline: PropTypes.string,
  description1: PropTypes.string,
  description2: PropTypes.string,
  path1: PropTypes.string,
  path2: PropTypes.string,
  finalUrl: PropTypes.string,
  expectedClicks: PropTypes.number,
  expectedClicksPercentage: PropTypes.number,
  useConversionCols: PropTypes.bool,
  ctr: PropTypes.number,
  conversionRate: PropTypes.number,
  conversionsPerImpression: PropTypes.number,
}

export default Ad
