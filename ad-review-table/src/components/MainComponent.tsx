import * as React from 'react';
import {
  ObjectFormat,
  Row,
  RawRow,
  Field,
  Fields,
  RawFields,
  MetricField,
  NumberType,
  Item
} from './../types';
import DataTable from './DataTable';

const MainComponent: React.SFC<Partial<ObjectFormat>> = props => {
  if (!props.fields || !props.tables || !props.tables.DEFAULT) {
    return <div>loading...</div>;
  }

  const fields = transformFields(props.fields as any);

  const table = {
    fields,
    data: transformData(props.tables.DEFAULT as any, fields)
  };

  return <DataTable style={props.style as any} table={table} />;
};

// transform the fields and rows into friendlier data structures
// combined into a single table

const transformFields = (fields: RawFields): Fields => {
  return {
    dimensions: fields.dimensions,
    metrics: fields.metrics.map(f => transformMetric(f))
  };
};

const transformMetric = (field: Field): MetricField => {
  let numberType = NumberType.NUMBER;

  if (field.name.toLowerCase().includes('rate')) {
    numberType = NumberType.RATE;
  } else if (field.name.toLowerCase().includes('cost')) {
    numberType = NumberType.CURRENCY;
  }

  return {
    ...field,
    numberType
  };
};

const formatMetric = (value: number, field: MetricField): Item => {
  if (typeof value === 'number') {
    if (field.numberType === NumberType.CURRENCY) {
      return {
        value,
        display: `$${(value / 1000000).toFixed(2)}`
      };
    }

    if (field.numberType === NumberType.RATE) {
      return {
        value,
        display: `${value.toFixed(2)}%`
      };
    }
  }

  return {
    value,
    display: value.toString()
  };
};

const transformData = (rows: RawRow[], fields: Fields): Row[] => {
  return rows.map(raw => ({
    metrics: raw.metrics.map((value, idx) =>
      formatMetric(value, fields.metrics[idx])
    ),
    dimensions: raw.dimensions.map(item => ({
      value: item,
      display: item
    })),
    adPreview: {
      description: getStringAndTrim(raw.description),
      description1: getStringAndTrim(raw.description1),
      description2: getStringAndTrim(raw.description2),
      displayUrl: getStringAndTrim(raw.displayUrl),
      path1: getStringAndTrim(raw.path1),
      path2: getStringAndTrim(raw.path2),
      headline: getString(raw.headline),
      headline1: getString(raw.headline1),
      headline2: getString(raw.headline2)
    }
  }));
};

const getString = (arr: string[]): string => {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr[0];
  }
  return '--';
};

const getStringAndTrim = (arr: string[]): string => {
  if (Array.isArray(arr) && arr.length > 0) {
    const str = arr[0].trim();
    return str.length > 0 ? str : '--';
  }
  return '--';
};

export default MainComponent;
