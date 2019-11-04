import * as React from 'react';
import { Colors } from '../types';
import {
  Divisor,
  Fraction,
  FractionBar,
  FractionLabel,
  FractionPart,
  Numerator,
  FractionNumber,
  HorizLine
} from './Styled';

interface Props {
  colors: Colors;
  target: number;
  actual: number;
  measure: string | null;
  isCurrency: boolean;
  currencySymbol: string;
  fontFamily: string;
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
  colors,
  target,
  actual,
  measure,
  isCurrency,
  currencySymbol,
  fontFamily
}) => {
  const numeratorColor = target > actual ? colors.negative : colors.positive;

  console.log('fontFamily', fontFamily);

  return (
    <div>
      <Fraction textColor={colors.primary}>
        <FractionPart>
          <Numerator>
            <FractionNumber color={numeratorColor}>
              {money(actual, isCurrency, currencySymbol)}
            </FractionNumber>
            <FractionLabel fontFamily={fontFamily}>{measure}</FractionLabel>
          </Numerator>
        </FractionPart>

        <FractionBar>
          <HorizLine color={colors.primary} />
        </FractionBar>

        <FractionPart>
          <Divisor>
            <FractionNumber>
              {money(target, isCurrency, currencySymbol)}
            </FractionNumber>
            <FractionLabel fontFamily={fontFamily}>
              Target {measure}
            </FractionLabel>
          </Divisor>
        </FractionPart>
      </Fraction>
    </div>
  );
};
