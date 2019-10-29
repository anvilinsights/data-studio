/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'

const Title = ({ override, defaultValue, fontColor, subtitle }) => {
  const text = override || defaultValue
  const color = fontColor.value.color || fontColor.defaultValue

  const titleStyle = css`
    color: ${color};
    margin-bottom: 5px;
  `
  const subHeadStyle = css`
    color: #999;
    font-size: 12px;
    font-weight: normal;
    font-style: italic;
  `

  return (
    <React.Fragment>
      <h2 css={titleStyle}>{text}</h2>
      <p css={subHeadStyle}>{subtitle}</p>
    </React.Fragment>
  )
}

Title.propTypes = {
  override: PropTypes.string,
  defaultValue: PropTypes.string,
  subtitle: PropTypes.string,
}

export default Title
