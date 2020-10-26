/** @jsx jsx */
import { FontWeightProperty } from 'csstype';
import { Theme } from '../types';
import styled from './../styled';

export interface WithTheme {
  theme: Theme;
}

export interface CardColors {
  colors: { primary?: string | null };
}

export const Container = styled.div({
  width: 'auto',
  padding: 20,
  flexBasis: '100%',
  display: 'flex',
});

export const Card = styled.div<CardColors>(
  {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: 20,
    alignContent: 'center',
    textAlign: 'center',
    flexBasis: '100%',
    justifyContent: 'center',
  } as any,
  ({ colors }: CardColors) => ({
    color: colors.primary,
  }),
  ({ theme }) => {
    const center = {
      alignContent: 'center',
      textAlign: 'center',
      justifyContent: 'center',
    };

    const left = {
      alignContent: 'flex-start',
      textAlign: 'left',
      justifyContent: 'flex-start',
    };

    return (theme.alignment === 'center' ? center : left) as any;
  }
);

interface TextColor {
  textColor: string;
  fontFamily?: string | null;
}

export const Percentage = styled.div<TextColor>(
  {
    display: 'flex',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    flexDirection: 'row',
  },
  ({ textColor }: TextColor) => ({ color: textColor }),
  ({ theme }) => {
    const left = {
      justifyContent: 'flex-start',
    };
    const center = {
      justifyContent: 'center',
    };

    return theme.alignment === 'center' ? center : left;
  }
);

export const PercentageText = styled.div({
  // fontSize: '96px',
  fontSize: '15vw',
  fontWeight: 'bold',
});

export const PercentageSubtitle = styled.div<PercentageSubtitleProps>(
  {
    fontSize: '4vw',
    fontStyle: 'italic',
    fontWeight: 300,
  },
  ({ fontFamily }) => ({ fontFamily })
);

export interface StyledTextProps {
  color?: string | null;
  weight?: FontWeightProperty | null;
  fontFamily?: string | null;
}

export interface PercentageSubtitleProps {
  fontFamily?: string | null;
}

export const StyledText = styled.span<StyledTextProps>(
  ({ color, weight, fontFamily }) => ({
    color,
    fontWeight: weight,
    fontFamily,
  })
);

export const Title = styled.div<Record<any, any>>(
  {
    fontSize: '4vw',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  ({ theme }) => {
    const left = {
      textAlign: 'left',
    };

    const center = {
      textAlign: 'center',
    };

    return (theme.alignment === 'center' ? center : left) as any;
  }
);

export const ErrorComponent = styled.div({
  fontSize: 16,
  background: '#ff9c9c',
  borderRadius: 1,
  padding: 5,
});

export const Fraction = styled.div<TextColor>(
  {
    fontSize: '4vw',
    display: 'flex',
    marginBottom: 10,
    minHeight: '50vh',
    position: 'relative',
  },
  ({ textColor, fontFamily }) => ({ color: textColor, fontFamily })
);

export const FractionPart = styled.div({
  textAlign: 'left',
  display: 'flex',
  minWidth: 150,
});

export const Numerator = styled.div({
  marginRight: 15,
  alignSelf: 'flex-start',
});

export const Divisor = styled.div({
  alignSelf: 'flex-end',
  marginLeft: 15,
});

export interface OptionalColor {
  color?: string | null;
}

export const FractionNumber = styled.div<OptionalColor>(
  {
    fontSize: '2rem',
  },
  ({ color }) => ({ color })
);

export const FractionLabel = styled.div<StyledTextProps>(
  {
    fontWeight: 300,
  },
  ({ fontFamily }) => ({ fontFamily })
);

export const FractionBar = styled.div({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  transform: 'rotate(-20deg)',
  zIndex: -1,
  opacity: 0.8,
});

export interface HorizLineProps {
  color: string;
}

export const HorizLine = styled.div<HorizLineProps>(
  {
    background: 'black',
    height: '4px',
    width: '100%',
  },
  ({ color }) => ({ background: color })
);
