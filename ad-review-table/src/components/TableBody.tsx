/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import * as React from 'react';
import { Row, Fields } from './../types';

import TableRow from './TableRow';

interface Props {
  data: Row[];
  fields: Fields;
}

const TableBody: React.SFC<Props> = ({ data, fields }) => {
  if (!Array.isArray(data)) {
    return null;
  }

  return (
    <tbody>
      {data.map((row, idx) => (
        <TableRow key={idx} data={row} isEven={idx % 2 === 0} fields={fields} />
      ))}
    </tbody>
  );
};

export default TableBody;
