/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import * as React from 'react';

interface Props {
  width?: string;
}

const styles = ({ width }: Props) =>
  css({
    flexBasis: width
  });

const LayoutCol: React.SFC<Props> = props => {
  return <div css={styles(props)}>{props.children}</div>;
};

LayoutCol.defaultProps = {
  width: 'auto'
};

export default LayoutCol;
