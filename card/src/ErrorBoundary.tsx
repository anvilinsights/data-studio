import * as React from 'react';

interface State {
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<{}, State> {
  public readonly state: State = {};

  public constructor(props: any) {
    super(props);

    this.resetComponent.bind(this);
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // tslint:disable:no-console
    console.log(
      '%cERROR[class ErrorBoundary][method componentDidCatch] Error occurred',
      'color: red'
    );
    console.log(error);
    console.log(errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  public resetComponent(ev: React.MouseEvent) {
    ev.preventDefault();

    this.setState({});

    return false;
  }

  public render() {
    if (this.state.error) {
      return (
        <div>
          <p>
            <strong>An error occurred, click to reload</strong>
          </p>

          <p>Error: {this.state.error.name}</p>
          <p>Message: {this.state.error.message}</p>

          {this.state.errorInfo ? (
            <>
              <p>
                <strong>Stack Trace:</strong>
              </p>
              <p>{this.state.errorInfo.componentStack}</p>
            </>
          ) : null}
        </div>
      );
    }

    return this.props.children;
  }
}
