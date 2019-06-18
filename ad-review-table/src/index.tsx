/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import * as dscc from '@google/dscc';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MainComponent from './components/MainComponent';

const LOCAL = process.env.NODE_ENV !== 'production';

const setup = () => {
  const mainDiv = document.createElement('div');
  mainDiv.id = 'app';
  document.body.appendChild(mainDiv);

  ReactDOM.render(<AppComponent />, document.getElementById('app'));
};

type State = Partial<dscc.ObjectFormat>;

class AppComponent extends React.Component<{}, State> {
  public static state: State = {};

  constructor(props: any) {
    super(props);
    this.handleDataUpdate.bind(this);
  }

  public componentDidMount() {
    if (LOCAL) {
      const local = require('./localMessage.js');
      this.handleDataUpdate(local.message);
    } else {
      dscc.subscribeToData(data => this.handleDataUpdate(data), {
        transform: dscc.objectTransform
      });
    }
  }

  public handleDataUpdate(data: State) {
    this.setState(data);
  }

  public render() {
    const styles = css`
      @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

      * {
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
      }
    `;
    return (
      <React.Fragment>
        <Global styles={styles} />
        <MainComponent {...this.state} />
      </React.Fragment>
    );
  }
}

setup();
