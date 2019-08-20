/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import ForwardIcon from '@material-ui/icons/Forward'

const PerformanceCell = ({ value }) => {
  const absValue = parseInt(Math.abs(value * 100))
  const sign = value < 0 ? 'neg' : 'pos'

  const getStyles = sign => {
    return [sign == 'neg' ? negStyle : posStyle, iconStyle]
  }

  const iconStyle = css`
    position: relative;
    top: 6px;
  `

  const posStyle = css`
    transform: rotate(-90deg);
  `
  const negStyle = css`
    transform: rotate(90deg);
  `

  const color = sign == 'neg' ? 'red' : '#14E418'

  const spanStyle = css`
    color: ${color};
  `

  return (
    <span css={spanStyle}>
      <ForwardIcon css={getStyles(sign)} />
      {absValue}%
    </span>
  )
}

PerformanceCell.propTypes = {
  value: PropTypes.string,
}

export default PerformanceCell
