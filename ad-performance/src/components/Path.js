/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import { exists } from '../utils'

const Path = ({ path1, path2 }) => {
  let pathString = ''
  if (exists(path1)) {
    pathString += '/' + path1
  }

  if (exists(path2)) {
    pathString += '/' + path2
  }

  const descriptionStyle = css`
    color: #39aa33;
    font-size: 12px;
    line-height: 1em !important;
    margin: 3px;
    padding: 0;
  `

  if (pathString == 0) {
    return <span />
  } else {
    return (
      <p css={descriptionStyle}>
        {'<'}domain{'>'}
        {pathString}
      </p>
    )
  }
}

Path.propTypes = {
  path1: PropTypes.string,
  path2: PropTypes.string,
}

export default Path
