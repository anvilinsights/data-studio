import { useErrorContext } from '../components/ErrorComponent';
import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { StyleData } from '../types';

const ERROR_TYPE = 'use_number_formatter_error';

export const useNumberFormatter = (
  styleData: StyleData,
  signDisplay: 'auto' | 'never' | 'always' | 'exceptZero' = 'auto'
): Intl.NumberFormat | null => {
  const ctx = useErrorContext();
  const ctxHasConfigError = ctx.error?.type === ERROR_TYPE;
  const [formatter, setFormatter] = useState(null);

  // const reRender = useCallback(() => {
  //   setState((prev) => prev + 1);
  // }, [setState]);

  const ref = useRef({
    lastVersionSeen: 0,
    configError: null,
    formatter: null,
  });

  const locale = styleData.locale.value ?? styleData.locale.defaultValue;
  const maximumFractionDigits =
    styleData.maximumFractionDigits?.value ??
    styleData.maximumFractionDigits?.defaultValue;
  const minimumFractionDigits =
    styleData.minimumFractionDigits?.value ??
    styleData.minimumFractionDigits?.defaultValue;
  const style = styleData.valueType?.value ?? styleData.valueType?.defaultValue;
  const currency =
    styleData.currency?.value ?? styleData.currency?.defaultValue;

  const options = useMemo(() => {
    return {
      version: ref.current.lastVersionSeen + 1,
      locale,
      maximumFractionDigits,
      minimumFractionDigits,
      style,
      currency,
      signDisplay,
    };
  }, [
    locale,
    maximumFractionDigits,
    minimumFractionDigits,
    style,
    currency,
    signDisplay,
  ]);

  useEffect(() => {
    // when the version in the options doesn't match the last version seen, we
    // need to try and recreate the formatter
    if (options.version !== ref.current.lastVersionSeen) {
      ref.current.configError = null;

      // validate the max and min fraction digits
      if (
        typeof options.maximumFractionDigits === 'number' &&
        typeof options.minimumFractionDigits === 'number' &&
        options.minimumFractionDigits > options.maximumFractionDigits
      ) {
        ref.current.configError = {
          type: ERROR_TYPE,
          message:
            'The maximum number of fraction digits must be greater than or equal to the minimum',
        };
      } else {
        // if the
        try {
          ref.current.formatter = new Intl.NumberFormat(locale, {
            style: options.style,
            maximumFractionDigits: options.maximumFractionDigits,
            minimumFractionDigits: options.minimumFractionDigits,
            currency: options.currency,
            // sign display isn't available for all browsers but is in most and
            // typescript doesn't know that so we have to trick it
            ...({
              signDisplay: options.signDisplay,
            } as any),
          });
        } catch (err) {
          ref.current.configError = { type: ERROR_TYPE, message: err.message };
        }
      }

      // if there is a formatter we want to force the re-render
      if (ref.current.formatter) {
        setFormatter(ref.current.formatter);
      }
    }

    if (ref.current.configError !== null) {
      ctx.setError(ref.current.configError);
    }

    if (ctxHasConfigError && ref.current.configError === null) {
      ctx.clearError();
    }

    ref.current.lastVersionSeen = options.version;
  }, [options, ctx.setError, ctx.clearError, ctxHasConfigError, setFormatter]);

  return formatter;
};
