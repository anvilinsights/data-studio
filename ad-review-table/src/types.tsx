import * as dscc from '@google/dscc';

export type ObjectFormat = dscc.ObjectFormat;
export type DSObjectRow = dscc.ObjectRow;

export interface Table {
  fields: Fields;
  data: Row[];
}

export interface StyleItem {
  defaultValue?: string;
  value?: string;
}

export interface Style {
  title: StyleItem;
  [key: string]: StyleItem;
}

export interface AdPreview {
  description: string;
  description1: string;
  description2: string;
  displayUrl: string;
  path1: string;
  path2: string;
  headline: string;
  headline1: string;
  headline2: string;
}

export interface Field {
  concept: string;
  id: string;
  name: string;
  type: string;
}

export enum NumberType {
  NUMBER = 'NUMBER',
  RATE = 'RATE',
  CURRENCY = 'CURRENCY'
}

export interface MetricField extends Field {
  numberType: NumberType;
}

export interface RawFields {
  metrics: Field[];
  dimensions: Field[];
  description: Field[];
  description1: Field[];
  description2: Field[];
  displayUrl: Field[];
  path1: Field[];
  path2: Field[];
  headline: Field[];
  headline1: Field[];
  headline2: Field[];
}

export interface Fields {
  metrics: MetricField[];
  dimensions: Field[];
}

export interface Row {
  metrics: Item[];
  dimensions: Item[];
  adPreview: AdPreview;
}

export interface Item {
  value: string | number;
  display: string;
}

export interface RawRow {
  dimensions: string[];
  metrics: number[];
  description: string[];
  description1: string[];
  description2: string[];
  displayUrl: string[];
  path1: string[];
  path2: string[];
  headline: string[];
  headline1: string[];
  headline2: string[];
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}
