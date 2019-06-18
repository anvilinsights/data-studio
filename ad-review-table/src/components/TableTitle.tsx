/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import * as React from 'react';

const styles = css({
  fontWeight: 800
});

interface Props {
  title: {
    defaultValue?: string;
    value?: string;
  };
}

const TableTitle: React.SFC<Props> = ({ title }) => {
  const { value, defaultValue } = title;
  const displayValue = value ? value : defaultValue;
  return <div css={styles}>{displayValue}</div>;
};

export default TableTitle;
