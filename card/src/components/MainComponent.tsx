import * as React from 'react';
import { DSData } from './../types';
import { CardComponent } from './CardComponent';
import { Container } from './Styled';

// tslint:disable-next-line:no-empty-interface
interface Props extends DSData {}

const MainComponent: React.SFC<Props> = props => {
  if (!props.tables || !props.style || !props.fields) {
    // tslint:disable-next-line:no-console
    console.error('tables/style/fields are null/undefined/false');
    return null;
  }

  const { tables, style, fields, theme } = props;
  const { actual: metricField } = fields;

  // ensure tables.DEFAULT is an array
  if (!Array.isArray(tables.DEFAULT)) {
    // tslint:disable-next-line:no-console
    console.error('tables.DEFAULT is not an array');
    return null;
  }

  // ensure tables.DEFAULT has elements
  if (tables.DEFAULT.length === 0) {
    // tslint:disable-next-line:no-console
    console.error('tables.DEFAULT has length 0');
    return null;
  }

  const { target, actual } = tables.DEFAULT[0];

  // make sure actual is an array with an element
  if (
    !Array.isArray(actual) ||
    (Array.isArray(actual) && actual.length === 0)
  ) {
    // tslint:disable-next-line:no-console
    console.error('Actual is not an array or has length 0');
    return null;
  }

  // make sure target is an array with an element
  if (
    !Array.isArray(target) ||
    (Array.isArray(target) && target.length === 0)
  ) {
    // tslint:disable-next-line:no-console
    console.error('Target is not an array or has length 0');
    return null;
  }

  // make sure we have data in target dimension
  if (target.length === 0) {
    // tslint:disable-next-line:no-console
    console.error("The 'target' dimension does not have any data");
    return null;
  }

  // make sure we have data in actual dimension
  if (actual.length === 0) {
    // tslint:disable-next-line:no-console
    console.error("The 'actual' dimension does not have any data");
  }

  if (actual.length > 1) {
    // tslint:disable-next-line:no-console
    console.warn("The 'actual' should only have one data value");
  }

  if (target.length > 1) {
    // tslint:disable-next-line:no-console
    console.warn("The 'target' should only have one data value");
  }

  return (
    <Container>
      <CardComponent
        target={target[0]}
        actual={actual[0]}
        style={style}
        fieldName={metricField[0].name}
        theme={theme}
      />
    </Container>
  );
};

export default MainComponent;
