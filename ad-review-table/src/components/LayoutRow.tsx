/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import * as React from 'react';

const styles = css({
  display: 'flex',
  width: '100%',
  padding: '10px 5px'
});

interface Props {}

const LayoutRow: React.SFC<Props> = props => {
  return <div css={styles}>{props.children}</div>;
};

export default LayoutRow;
