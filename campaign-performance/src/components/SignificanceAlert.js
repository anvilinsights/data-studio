/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import ReportProblemOutlined from '@material-ui/icons/ReportProblemOutlined'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import InfoPopover from '../components/InfoPopover'

const SignificanceAlert = ({ p, background, font }) => {
  const alert = p < 0.05
  const backgroundColor = background.value.color || background.defaultValue
  const fontColor = font.value.color || font.defaultValue

  const iconStyle = {
    fontSize: 50,
    color: fontColor,
    padding: 15,
  }

  const headline = alert
    ? "We've discovered something that may require your attention."
    : 'We did not find anything unexpected with this data.'

  const explanation = alert
    ? 'The statistical model used (Chi-Squared) was able to detect a significant relationship between your data sets and the outcomes with at least 95% accuracy.'
    : 'The statistical model used (Chi-Squared) was not able to find anything far enough out of the ordinary to determine the outcome was not just random luck.'

  const alertStyles = css`
    background: ${backgroundColor};
    padding: 5px 10px;
    border-radius: 10px;
    color: ${fontColor};
    display: flex;
    align-items: center;
    position: relative;
  `

  const headlineStyles = css`
    margin-bottom: 0px;
  `

  const explanationStyles = css`
    font-weight: normal;
    font-size: 16px;
    width: 650px;
    margin-top: 10px;
  `

  const popoverHeader = css`
    padding: 0;
    margin: 0 0 10px 0;
    font-size: 13px;
    display: block;
    font-weight: bold;
  `
  return (
    <div css={alertStyles}>
      {alert ? (
        <ReportProblemOutlined style={iconStyle} />
      ) : (
        <HelpOutlineIcon style={iconStyle} />
      )}
      <div>
        <h3 css={headlineStyles}>{headline}</h3>
        <h4 css={explanationStyles}>{explanation}</h4>
        <InfoPopover placement="left-start">
          <span css={popoverHeader}>Discovery</span>
          Once the numbers have been run through the test, you will see the
          expected value for your observed outcome. We will also show the
          difference between what was expected and what was actually observed.
          This is helpful if a relationship was found to see what groups did
          better than expected and what groups did worse.
        </InfoPopover>
      </div>
    </div>
  )
}

SignificanceAlert.propTypes = {
  p: PropTypes.number,
  background: PropTypes.object,
}

export default SignificanceAlert
