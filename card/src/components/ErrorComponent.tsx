import * as React from 'react';
import {
  createContext,
  useMemo,
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
  FC,
} from 'react';
import { MdErrorOutline } from 'react-icons/md';

export const ErrorProvider: FC = ({ children }) => {
  const [state, setState] = useState<ErrorValue | null>();
  const mem = useRef({ curr: undefined, prev: undefined, hasError: false })
    .current;

  const setError = useCallback(
    (e: string | ErrorValue) => {
      if (typeof e === 'string') {
        return setState({ message: e });
      }
      return setState(e);
    },
    [setState]
  );

  const clearError = useCallback(() => {
    setState(null);
  }, [setState]);

  useEffect(() => {
    mem.prev = mem.curr;
    mem.curr = state;
    mem.hasError = !!state;
  }, [state]);

  const value = useMemo(() => {
    return {
      error: state,
      setError: setError,
      clearError: clearError,
      memory: mem,
    };
  }, [state, setError, clearError, mem]);

  useEffect(() => {
    value.memory = mem;
  });

  return (
    <ErrorContext.Provider value={value}>
      <>
        {children}
        <ErrorComponent />
      </>
    </ErrorContext.Provider>
  );
};

export const ErrorComponent: FC = () => {
  const { error, clearError } = useErrorContext();

  // const handleClick = useCallback(() => {
  //   clearError();
  // }, [clearError]);

  if (!error) {
    return null;
  }

  return (
    <div
      css={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        width: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        letterSpacing: 0.15,
        lineHeight: 1.43,
      }}
    >
      <div
        css={{
          background: '#f44336',
          color: '#fff',
          maxWidth: '75%',
          display: 'flex',
          alignItems: 'center',
          padding: '6px 16px',
        }}
      >
        <div
          css={{
            fontSize: 20,
            padding: '7px 0',
            marginRight: 8,
            display: 'flex',
          }}
        >
          <MdErrorOutline />
        </div>
        <div css={{ padding: '8px 0' }}>{error?.message}</div>
      </div>
    </div>
  );
};

export const useErrorContext = (): ErrContext => {
  return useContext(ErrorContext);
};

interface ContextValue<T> {
  error?: T;
  setError: (_: string | T) => any;
  clearError: () => any;
  memory: Memory<T>;
}

interface Memory<T> {
  prev?: T;
  curr?: T;
  hasError: boolean;
}

interface ErrorValue {
  message: string;
  type?: any;
}

type ErrContext = ContextValue<ErrorValue>;

export const ErrorContext = createContext<ErrContext>({
  error: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setError: (_) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearError: () => {},
  memory: { hasError: false },
});
