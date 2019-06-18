/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import * as React from 'react';
import { Style, Table, Row, Fields } from '../types';

import TableBody from './TableBody';
import TableHeader from './TableHeader';

import LayoutRow from './LayoutRow';
import LayoutCol from './LayoutCol';
import TableTitle from './TableTitle';
import { SortDirection } from './../types';

const styles = css({
  width: '100%',
  borderSpacing: 0,
  borderCollapse: 'collapse',
  backgroundColor: '#fff'
});

interface Props {
  table: Table;
  style: Style;
}

interface State {
  data: Row[];
  fields: Fields;
  sort: {
    field?: string;
    direction?: SortDirection;
  };
}

const cmp = (a: any, b: any, direction: SortDirection) => {
  if (direction === SortDirection.ASC) {
    return a > b ? 1 : -1;
  }
  return a > b ? -1 : 1;
};

const sortData = (
  data: Row[],
  key: 'dimensions' | 'metrics',
  idx: number,
  direction: SortDirection
): Row[] => {
  return data.sort((a, b) => {
    const a2 = a[key][idx].value;
    const b2 = b[key][idx].value;
    if (a2 === b2) {
      return 0;
    }
    return cmp(a2, b2, direction);
  });
};

const DataTable: React.SFC<Props> = ({ table, style }) => {
  const [state, setState] = React.useState<State>({
    data: [],
    fields: {
      metrics: [],
      dimensions: []
    },
    sort: {}
  });

  React.useEffect(() => {
    setState({
      data: table.data,
      fields: table.fields,
      sort: {}
    });
  }, [table.data, table.fields]);

  const handleSort = (
    id: string,
    type: 'metrics' | 'dimensions',
    index: number
  ) => {
    let nextDirection = SortDirection.ASC;
    if (state.sort.field === id) {
      nextDirection =
        state.sort.direction === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC;
    }
    setState({
      ...state,
      data: sortData(state.data, type, index, nextDirection),
      sort: {
        field: id,
        direction: nextDirection
      }
    });
    return;
  };

  return (
    <div>
      <LayoutRow>
        <LayoutCol>
          <TableTitle title={style.title} />
        </LayoutCol>
      </LayoutRow>
      <table css={styles}>
        <TableHeader
          style={style}
          fields={state.fields}
          handleSort={handleSort}
          sort={state.sort}
        />
        <TableBody data={state.data} fields={state.fields} />
      </table>
    </div>
  );
};

export default DataTable;
