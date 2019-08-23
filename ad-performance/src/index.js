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
    ])

    // console.log('grandTotal', frame.stat.sum('impressions'))
    // console.log('click column total', frame.stat.sum('clicks'))

    const dataFrame = frame
      .map(row => {
        const clickColTotal = frame.stat.sum('clicks')
        const conversionColTotal = frame.stat.sum('conversions')
        const rowTotal = row.get('impressions')
        const grandTotal = frame.stat.sum('impressions')

        const expectedClicks = stats.expected(
          rowTotal,
          clickColTotal,
          grandTotal,
        )

        const expectedConversions = stats.expected(
          rowTotal,
          conversionColTotal,
          grandTotal,
        )

        // Non-predictive stats
        const conversionRate =
          (row.get('conversions') / row.get('clicks')) * 100
        const ctr = (row.get('clicks') / row.get('impressions')) * 100
        const conversionsPerImpression =
          (row.get('conversions') / row.get('impressions')) * 100
        //

        const exClicksPct =
          stats.expectedPercentage(expectedClicks, row.get('clicks')) - 1

        const exConversionsPct =
          stats.expectedPercentage(
            expectedConversions,
            row.get('conversions'),
          ) - 1
        return row
          .set('expectedClicks', expectedClicks)
          .set('expectedClicksPercentage', exClicksPct)
          .set('expectedConversions', expectedConversions)
          .set('expectedConversionsPercentage', exConversionsPct)
          .set('conversionRate', conversionRate)
          .set('ctr', ctr)
          .set('conversionsPerImpression', conversionsPerImpression)
      })
      .sortBy('expectedClicksPercentage', true)

    const pStatsClicks = dataFrame.select('clicks', 'expectedClicks').toDict()
    const pValueClicks = stats.pValue(
      pStatsClicks.clicks,
      pStatsClicks.expectedClicks,
      1,
    )
    const pStatsConversions = dataFrame
      .select('conversions', 'expectedConversions')
      .toDict()
    const pValueConversions = stats.pValue(
      pStatsConversions.conversions,
      pStatsConversions.expectedConversions,
      1,
    )

    this.setState({ ...data, dataFrame, pValueClicks, pValueConversions })
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
