import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import { Alignment, ColorObject, Colors, StyleData, Theme } from './../types';
import { PercentComponent } from './PercentComponent';
import { RatioComponent } from './RatioComponent';
import { Card, Title } from './Styled';

const isColorObject = (obj: any): obj is ColorObject => {
  return obj && obj.color;
};

// Extracting colors for the style obj can be tedious, this will try to extract a color from
// one of the StyleData properties. First validate the key and validate the user set a value
// and it is in the shape of a ColorObject. If not return null unless the defaultValue is a string;
const extractColor = (
  style: StyleData,
  key: keyof StyleData
): string | null => {
  if (!style || !style[key]) {
    return null;
  }

  const obj = style[key];

  if (isColorObject(obj.value)) {
    return obj.value.color;
  }

  if (typeof obj.defaultValue === 'string') {
    return obj.defaultValue;
  }

  return null;
};

const extractValue = (style: StyleData, key: keyof StyleData): any | null => {
  if (style[key] && style[key].value) {
    const value = style[key].value;

    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'boolean') {
      return value;
    }

    return null;
  }

  const value = style[key].defaultValue;

  return typeof value === 'string' ? value : null;
};

interface Props {
  style: StyleData;
  target: number;
  actual: number;
  fieldName: string;
}

export const CardComponent: React.SFC<Props> = props => {
  const fontColor = extractColor(props.style, 'fontColor');
  const negativeColor = extractColor(props.style, 'negativeColor');
  const positiveColor = extractColor(props.style, 'positiveColor');

  const title = extractValue(props.style, 'title');
  const measure = extractValue(props.style, 'measure');
  const format = extractValue(props.style, 'format');
  const alignment = extractValue(props.style, 'alignment') as Alignment;
  const isCurrency = extractValue(props.style, 'isCurrency');
  const currencySymbol = extractValue(props.style, 'currencySymbol');

  const measureLabel = measure || props.fieldName;

  const colors: Colors = {
    primary: fontColor,
    negative: negativeColor,
    positive: positiveColor
  };

  const theme: Theme = {
    colors,
    alignment
  };

  let figure = (
    <RatioComponent
      colors={colors}
      target={props.target}
      actual={props.actual}
      measure={measureLabel}
      isCurrency={isCurrency}
      currencySymbol={currencySymbol}
    />
  );

  if (format === 'percentage') {
    figure = (
      <PercentComponent
        colors={colors}
        target={props.target}
        actual={props.actual}
        measure={measureLabel}
      />
    );
  }

  const baseColors = {
    primary: colors.primary
  };

  return (
    <ThemeProvider theme={theme}>
      <Card colors={baseColors}>
        {title ? <Title>{title}</Title> : null}
        {figure}
      </Card>
    </ThemeProvider>
  );
};
