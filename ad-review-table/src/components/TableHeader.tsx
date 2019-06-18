/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import * as React from 'react';
import { Fields, Style, SortDirection } from './../types';
import Sort from './Sort';

interface Props {
  style: Style;
  fields: Fields;
  handleSort: (id: string, key: string, index: number) => void;
  sort: {
    field?: string;
    direction?: SortDirection;
  };
}

const thStyle = css({
  textAlign: 'left',
  fontSize: 12,
  fontWeight: 800,
  padding: 5
});

const trStyle = css({
  borderBottom: 'solid 1px #ccc'
});

const cellStyle = css({
  display: 'flex',
  cursor: 'pointer'
});

const TableHeader: React.SFC<Props> = ({
  style: config,
  fields,
  handleSort,
  sort
}) => {
  return (
    <React.Fragment>
      <thead>
        <tr css={trStyle}>
          {fields.dimensions.map((dim, idx) => (
            <th
              css={thStyle}
              key={dim.id}
              onClick={() => handleSort(dim.id, 'dimensions', idx)}
            >
              <div css={cellStyle}>
                <div>
                  <span>{dim.name}</span>
                </div>
                <Sort
                  sort={sort.field === dim.id ? sort.direction : undefined}
                />
              </div>
            </th>
          ))}
          <th css={thStyle}>Ad Preview</th>
          {fields.metrics.map((dim, idx) => (
            <th
              css={thStyle}
              key={dim.id}
              onClick={() => handleSort(dim.id, 'metrics', idx)}
            >
              <div css={cellStyle}>
                <div>
                  <span>{dim.name}</span>
                </div>
                <Sort
                  sort={sort.field === dim.id ? sort.direction : undefined}
                />
              </div>
            </th>
          ))}
        </tr>
      </thead>
    </React.Fragment>
  );
};

export default TableHeader;
