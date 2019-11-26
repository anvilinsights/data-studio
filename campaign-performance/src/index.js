/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core'
import * as dscc from '@google/dscc'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MainComponent from './components/MainComponent'
import Dataframe from 'dataframe-js'
import { DataProvider } from './utils/DataContext'
import * as stats from './utils/stats'
import ErrorMessage from './components/ErrorMessage'

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
      hasError: false,
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

  static getDerivedStateFromError(error) {
    return { hasError: !!error }
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

    // console.log('grandTotal', frame.stat.sum('impressions'))
    // console.log('click column total', frame.stat.sum('clicks'))

    const dataFrame = frame
      .map(row => {
        const colTotal = frame.stat.sum('clicks')
        const rowTotal = row.get('impressions')
        const grandTotal = frame.stat.sum('impressions')

        const expected = stats.expected(rowTotal, colTotal, grandTotal)
        const exPct = stats.expectedPercentage(expected, row.get('clicks')) - 1
        return row.set('expected', expected).set('expectedPercentage', exPct)
      })
      .sortBy('expectedPercentage', true)

    const pStats = dataFrame.select('clicks', 'expected').toDict()
    const pValue = stats.pValue(pStats.clicks, pStats.expected, 1)

    const bodyWidth = document.body.clientWidth

    this.setState({ ...data, dataFrame, pValue, bodyWidth, hasError: false })
  }

  render() {
    const { hasError, dataFrame, fields } = this.state
    const errorMessage =
      fields && fields.metricID && fields.metricID.length < 2
        ? 'Please add an additional metric'
        : 'There has been an error. Please refresh or try again later.'

    const styles = css`
      * {
        font-family: Helvetica, Arial, sans-serif;
      }
    `
    return (
      <React.Fragment>
        <Global styles={styles} />
        <DataProvider value={dataFrame}>
          {hasError ? (
            <ErrorMessage message={errorMessage} />
          ) : (
            <MainComponent {...this.state} />
          )}
        </DataProvider>
      </React.Fragment>
    )
  }
}

setup()
