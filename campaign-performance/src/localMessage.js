/**
 * This file provides the mock "data" received
 * by your visualization code when you develop
 * locally.
 *
 */
export const message = {
  tables: {
    DEFAULT: [
      {
        dimID: ['Campaign 1'],
        metricID: [70, 5200],
      },
      {
        dimID: ['Camp 4'],
        metricID: [40, 2891],
      },
      {
        dimID: ['Camp 2'],
        metricID: [12, 528],
      },
      {
        dimID: ['Camp 3'],
        metricID: [7, 603],
      },
    ],
  },
  fields: {
    dimID: [
      {
        id: 'qt_nzqx6a0xvb',
        name: 'Campaign',
        type: 'TEXT',
        concept: 'DIMENSION',
      },
    ],
    metricID: [
      {
        id: 'qt_8isx6a0xvb',
        name: 'Clicks',
        type: 'NUMBER',
        concept: 'METRIC',
      },
      {
        id: 'qt_8isx6a0xvc',
        name: 'Impressions',
        type: 'NUMBER',
        concept: 'METRIC',
      },
    ],
  },
  style: {
    title: {
      value: 'Campaign Performance',
      defaultValue: 'Backup Title',
    },
    subtitle: {
      value: 'Subtitle here',
    },
    impressionsLabel: {
      value: 'Impressions',
    },
    alertBackgroundColor: {
      value: { color: '#23064D', opacity: 1 },
    },
    alertFontColor: {
      value: { color: '#fff', opacity: 1 },
    },
    widgetBackgroundColor: {
      value: { color: '#3A0A81', opacity: 1 },
    },
    baseMetric: {
      value: 'Conversions',
    },
    baseMetricPastTense: {
      value: 'Converted',
    },
    tableFontColor: {
      value: { color: '#FBFAFC', opacity: 1 },
      defaultValue: '#fff',
    },
  },
  theme: {
    themeFontFamily: 'Roboto',
  },
}
