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
        metricID: [70, 5290],
      },
      {
        dimID: ['Camp 4'],
        metricID: [45, 2891],
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
    significanceThreshold: {
      value: '0.05',
      defaultValue: '0.05',
    },
  },
}
