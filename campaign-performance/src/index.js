/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core'
import * as dscc from '@google/dscc'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MainComponent from './components/MainComponent'

const LOCAL = process.env.NODE_ENV !== 'production'
// const LOCAL = false

const setup = () => {
  const mainDiv = document.createElement('div')
  mainDiv.id = 'app'
  document.body.appendChild(mainDiv)

  ReactDOM.render(<AppComponent />, document.getElementById('app'))
}

// type State = Partial<dscc.ObjectFormat>;

class AppComponent extends React.Component {
  // public static state: State = {};

  constructor(props) {
    super(props)
    this.handleDataUpdate.bind(this)
  }

  componentDidMount() {
    if (LOCAL) {
      const local = require('./localMessage.js')
      this.handleDataUpdate(local.message)
    } else {
      dscc.subscribeToData(data => this.handleDataUpdate(data), {
        transform: dscc.objectTransform,
      })
    }
  }

  handleDataUpdate(data) {
    console.log('handleDataUpdate', JSON.stringify(data))
    this.setState(data)
  }

  render() {
    const styles = css`
      @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

      * {
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
      }
    `
    return (
      <React.Fragment>
        <Global styles={styles} />
        <MainComponent {...this.state} />
      </React.Fragment>
    )
  }
}

setup()
