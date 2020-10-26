import * as React from 'react';
import { Colors, StyleData } from '../types';
import {
  Divisor,
  Fraction,
  FractionBar,
  FractionLabel,
  FractionPart,
  Numerator,
  FractionNumber,
  HorizLine,
} from './Styled';
import { useErrorContext } from './ErrorComponent';
import { useNumberFormatter } from '../hooks/useNumberFormatter';

enum ERR_TYPE {
  NUMBER_FORMAT = 'invalid_number_format_config',
  FRACTION_DIGITS = 'invalid_fraction_digits',
}

interface Props {
  style: StyleData;
  colors: Colors;
  target: number;
  actual: number;
  measure: string | null;
  isCurrency: boolean;
  currencySymbol: string;
}

const money = (
  val: number | string,
  isCurrency: boolean,
  currencySymbol: string
): string => {
  const symbolPrefix = isCurrency ? currencySymbol : '';

  // If the value is not numeric or money, return it raw
  if (typeof val !== 'number') {
    return val;
  } else if (!isCurrency) {
    return `${val.toFixed(0)}`;
  } else {
    // Format and add currency symbol
    return `${symbolPrefix}${val
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }
};
export const RatioComponent: React.SFC<Props> = ({
  style,
  colors,
  target,
  actual,
  measure,
}) => {
  const { setError, clearError, ...ctx } = useErrorContext();

  const formatter = useNumberFormatter(style);

  const numeratorColor = target > actual ? colors.negative : colors.positive;

  const actualFmtd = React.useMemo(() => {
    if (formatter) {
      return formatter.format(actual);
    }
    return null;
  }, [formatter, actual]);

  const targetFmtd = React.useMemo(() => {
    if (formatter) {
      return formatter.format(target);
    }
    return null;
  }, [formatter, actual]);

  return (
    <div>
      <Fraction textColor={colors.primary}>
        <FractionPart>
          <Numerator>
            <FractionNumber color={numeratorColor}>{actualFmtd}</FractionNumber>
            <FractionLabel>{measure}</FractionLabel>
          </Numerator>
        </FractionPart>

        <FractionBar>
          <HorizLine color={colors.primary} />
        </FractionBar>

        <FractionPart>
          <Divisor>
            <FractionNumber>{targetFmtd}</FractionNumber>
            <FractionLabel>Target {measure}</FractionLabel>
          </Divisor>
        </FractionPart>
      </Fraction>
    </div>
  );
};
