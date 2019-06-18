/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import * as React from 'react';
import SortIcon from './../icons/SortIcon';
import SortIconAsc from './../icons/SortIconAsc';
import SortIconDesc from './../icons/SortIconDesc';
import { SortDirection } from './../types';

const styles = css({
  marginLeft: 5,
  display: 'flex',
  alignItems: 'center'
});

interface Props {
  sort?: SortDirection;
}

const Sort: React.SFC<Props> = ({ sort }) => {
  let icon = <SortIcon key="sort_default" />;

  if (sort === SortDirection.ASC) {
    icon = <SortIconAsc key="sort_asc" />;
  } else if (sort === SortDirection.DESC) {
    icon = <SortIconDesc key="sort_desc" />;
  }

  return <div css={styles}>{icon}</div>;
};

export default Sort;
