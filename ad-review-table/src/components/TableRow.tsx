/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import * as React from 'react';
import { Row, Fields, Field, MetricField, NumberType } from './../types';
import AdPreview from './AdPreview';

interface Props {
  data: Row;
  isEven: boolean;
  fields: Fields;
}

const trStyles = (isEven: boolean) => {
  return css({
    fontSize: 14,
    backgroundColor: isEven ? '#f9f9f9' : '#f5f5f5'
  });
};

const tdStyles = css({
  padding: 5
});

const TableRow: React.SFC<Props> = ({ data, isEven }) => {
  return (
    <tr css={trStyles(isEven)}>
      {data.dimensions.map((item, idx) => (
        <td key={idx} css={tdStyles}>
          {item.display}
        </td>
      ))}
      <td css={tdStyles}>
        <AdPreview preview={data.adPreview} />
      </td>
      {data.metrics.map((item, idx) => (
        <td key={idx} css={tdStyles}>
          {item.display}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
