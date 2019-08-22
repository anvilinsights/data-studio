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
      conversions: x.metricID[2],
      cost: x.metricID[3],
      notClicked: stats.notClicked(x.metricID[0], x.metricID[1]),
      campaign: x.dimID[0],
      headline: x.dimID[1],
      headline1: x.dimID[2],
      headline2: x.dimID[3],
      description: x.dimID[4],
      description1: x.dimID[5],
      description2: x.dimID[6],
      path1: x.dimID[7],
      path2: x.dimID[8],
      finalUrl: x.dimID[9],
      id: x.dimID[10],
    }))

    console.log('rows', rows)

    const frame = new Dataframe(rows, [
      'clicks',
      'impressions',
      'conversions',
      'cost',
      'notClicked',
      'campaign',
      'headline',
      'headline1',
      'headline2',
      'description',
      'description1',
      'description2',
      'path1',
      'path2',
      'finalUrl',
      'id',
      // 'expected',
      // 'expectedPercentage',
    ])

    console.log('frame', frame)

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

    this.setState({ ...data, dataFrame, pValue })
    // this.setState({ ...data, dataFrame })
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
