/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import InfoIcon from '@material-ui/icons/Info'
import Popper from '@material-ui/core/Popper'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const InfoPopover = ({
  children,
  placement,
  iconColor,
  arrowOffset,
  offset,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  function handleOpen(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const infoStyle = css`
    opacity: 0.5;
    font-size: 10px;
    position: absolute;
    bottom: 10px;
    right: 15px;
    cursor: pointer;
    color: ${iconColor};
  `

  const popoverStyles = css`
    padding: 20px;
    font-size: 11px !important;
    width: 200px;
  `

  const arrowStyle = css`
    z-index: 1;
    position: absolute;
    font-size: 7px;
    margin: auto;
    display: block;
    width: 0;
    height: 0;
    border-top: 1.5em solid transparent;
    border-bottom: 1.5em solid transparent;
    border-left: 1.5em solid white;
    left: 239px;
    top: ${arrowOffset}px;
  `
  return (
    <React.Fragment>
      <InfoIcon css={infoStyle} onClick={handleOpen} />
      <Popper
        id={id}
        placement={placement}
        open={open}
        anchorEl={anchorEl}
        modifiers={{
          offset: {
            enabled: true,
            offset,
          },
        }}
      >
        <span css={arrowStyle} />
        <ClickAwayListener onClickAway={handleClose}>
          <Paper>
            <Typography css={popoverStyles}>{children}</Typography>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </React.Fragment>
  )
}

InfoPopover.propTypes = {
  children: PropTypes.node,
  placement: PropTypes.string,
  iconColor: PropTypes.string,
  arrowOffset: PropTypes.number,
  offset: PropTypes.number,
}

InfoPopover.defaultProps = {
  iconColor: 'inherit',
  arrowOffset: 43,
  offset: -40,
}

export default InfoPopover
