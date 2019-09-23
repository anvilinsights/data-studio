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
}

const money = (val: number | string): string => {
  return typeof val === 'number'
    ? `$${val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
    : val;
};
export const RatioComponent: React.SFC<Props> = ({
  colors,
  target,
  actual,
  measure
}) => {
  const numeratorColor = target > actual ? colors.negative : colors.positive;

  return (
    <div>
      <Fraction textColor={colors.primary}>
        <FractionPart>
          <Numerator>
            <FractionNumber color={numeratorColor}>
              {money(actual)}
            </FractionNumber>
            <FractionLabel>{measure}</FractionLabel>
          </Numerator>
        </FractionPart>

        <FractionBar>
          <HorizLine color={colors.primary} />
        </FractionBar>

        <FractionPart>
          <Divisor>
            <FractionNumber>{money(target)}</FractionNumber>
            <FractionLabel>Target {measure}</FractionLabel>
          </Divisor>
        </FractionPart>
      </Fraction>
    </div>
  );
};
