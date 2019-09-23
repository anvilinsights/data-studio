import * as React from 'react';
import { Colors } from '../types';
import {
  Percentage,
  PercentageSubtitle,
  PercentageText,
  StyledText
} from './Styled';

const formatNumber = (target: number, actual: number): [string, string] => {
  let sign = '';
  let value = 0;

  if (actual === target) {
    return ['', '0'];
  }

  if (actual > target) {
    sign = '+';
    value = -1;
  } else {
    sign = '-';
  }

  value = Math.round((actual / target + value) * 100);

  const formatted = `${value}%`;

  return [sign, formatted];
};

interface Props {
  colors: Colors;
  target: number;
  actual: number;
  measure: string | null;
}

export const PercentComponent: React.SFC<Props> = ({
  colors,
  target,
  actual,
  measure
}) => {
  const [sign, percent] = formatNumber(target, actual);

  let color = colors.positive;
  let signText = 'above';

  if (target > actual) {
    color = colors.negative;
    signText = 'below';
  }

  let text = null;

  if (measure) {
    text = (
      <PercentageSubtitle>
        ({measure} is {percent}{' '}
        <StyledText color={color} weight={500}>
          {signText}
        </StyledText>{' '}
        target)
      </PercentageSubtitle>
    );
  }

  return (
    <>
      <Percentage textColor={color}>
        <PercentageText>
          {sign} {percent}
        </PercentageText>
      </Percentage>
      {text}
    </>
  );
};
