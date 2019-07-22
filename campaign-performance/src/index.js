/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core'
import * as dscc from '@google/dscc'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MainComponent from './components/MainComponent'
import Dataframe from 'dataframe-js'
import { DataProvider } from './utils/DataContext'
import * as stats from './utils/stats'

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

    this.state = {
      dataFrame: {},
    }
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
    // console.log('handleDataUpdate', JSON.stringify(data))
    // console.log('DEFAULT', data.tables.DEFAULT)

    // Map click/notClick values into dataFrame
    const clickData = data.tables.DEFAULT
    const rows = clickData.map(x => ({
      clicks: x.metricID[0],
      impressions: x.metricID[1],
      notClicked: stats.notClicked(x.metricID[0], x.metricID[1]),
      name: x.dimID[0],
    }))

    const frame = new Dataframe(rows, [
      'clicks',
      'impressions',
      'notClicked',
      'name',
      'expected',
      'expectedPercentage',
    ])

    const dataFrame = frame.map(row => {
      const colTotal = frame.stat.sum('clicks')
      const rowTotal = row.get('impressions')
      const grandTotal = frame.stat.sum('impressions')

      const expected = stats.expected(rowTotal, colTotal, grandTotal)
      const exPct = stats.expectedPercentage(expected, row.get('clicks'))
      return row.set('expected', expected).set('expectedPercentage', exPct)
    })

    const pStats = dataFrame.select('clicks', 'expected').toDict()
    const pValue = stats.pValue(pStats.clicks, pStats.expected)

    this.setState({ ...data, dataFrame, pValue })
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
        <DataProvider value={this.state.dataFrame}>
          <MainComponent {...this.state} />
        </DataProvider>
      </React.Fragment>
    )
  }
}

setup()
