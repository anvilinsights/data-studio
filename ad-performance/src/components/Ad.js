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
import { exists } from '../utils/exist'

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
  expected,
  expectedPercentage,
  cost,
}) => {
  const positiveColor = '#246EB9'
  const negativeColor = '#F06543'
  // const expectedPercentage = 0
  const opacity = 0

  const adjustedColor =
    expectedPercentage > 0
      ? Color(positiveColor).darken(expectedPercentage)
      : Color(negativeColor).darken(expectedPercentage)

  const expectedStyle = css`
    background: #999;
  `

  const cellStyle = css`
    // opacity: ${opacity};
  `

  const colorStyle = css`
    background: ${adjustedColor.hsl().string()};
    color: ${adjustedColor.isLight() ? '#000' : '#dfdfdf'} !important;
  `

  const descriptionStyle = css`
    color: grey;
    font-size: 12px;
    line-height: 4px;
    padding-top: 0;
    margin-top: 0;
  `

  const headlineStyle = css`
    margin-bottom: 0px;
    margin-top: 0;
    font-size: 14px;
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
            <Typography>
              <h3 css={headlineStyle}>
                {headline} {exists(headline1) && <span>{headline1}</span>}
              </h3>
              {exists(headline2) && <h4 css={headlineStyle}>{headline2}</h4>}
              {exists(description) && (
                <span css={descriptionStyle}>{description}</span>
              )}
              {exists(description1) && (
                <span css={descriptionStyle}>{description1}</span>
              )}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {exists(description2) && (
                <p css={descriptionStyle}>{description2}</p>
              )}
              <Path path1={path1} path2={path2} />
              {exists(finalUrl) && <p css={descriptionStyle}>{finalUrl}</p>}
              {exists(id) && <p css={descriptionStyle}>ID: {id}</p>}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </TableCell>
      <TableCell role="cell" css={cellStyle} align="right">
        {impressions.toLocaleString()}
      </TableCell>
      <TableCell role="cell" css={cellStyle} align="right">
        {clicks.toLocaleString()}
      </TableCell>
      <TableCell role="cell" css={colorStyle} align="right">
        {conversions.toLocaleString()}
      </TableCell>
      <TableCell role="cell" css={colorStyle} align="right">
        {expected.toFixed(2)}
      </TableCell>
      <TableCell role="cell" css={colorStyle} align="right">
        <PerformanceCell value={expectedPercentage} />
      </TableCell>
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
}

export default Ad
