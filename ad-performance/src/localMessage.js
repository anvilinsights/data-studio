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
        dimID: [
          'Campaign Name Here',
          '',
          'Campany Motto Here',
          'Call to Action. Call Now!',
          '--',
          'Call Now For More Information!',
          'Call Us Today!',
          'path_one',
          'path_two',
          'https://www.example.com/',
        ],
        metricID: [6, 329, 0, 3.2],
      },
      {
        dimID: [
          'Campaign Name Here',
          '',
          'Campany Motto Here',
          'Call to Action. Call Now!',
          '--',
          'Call Now For More Information!',
          'Call Us Today!',
          'path_one',
          'path_two',
          'https://www.example.com/',
        ],
        metricID: [4, 21, 1, 3.14],
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
      {
        id: 'qt_asdgasdgadsv',
        name: 'Headline',
        type: 'TEXT',
        concept: 'DIMENSION',
      },
      {
        id: 'qt_wqerwer',
        name: 'Description1',
        type: 'TEXT',
        concept: 'DIMENSION',
      },
      {
        id: 'qt_wqerweddr',
        name: 'Description2',
        type: 'TEXT',
        concept: 'DIMENSION',
      },
      {
        id: 'qt_vbnbvcxbv',
        name: 'Path1',
        type: 'TEXT',
        concept: 'DIMENSION',
      },
      {
        id: 'qt_vbnbvcvsfcxbv',
        name: 'Path2',
        type: 'TEXT',
        concept: 'DIMENSION',
      },
      {
        id: 'qt_vbsdfnbvcvsfcxbv',
        name: 'FinalUrl',
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
      {
        id: 'qt_8isx6asdf0xvc',
        name: 'Conversions',
        type: 'NUMBER',
        concept: 'METRIC',
      },
      {
        id: 'qt_8sdf0xvc',
        name: 'Cost',
        type: 'NUMBER',
        concept: 'METRIC',
      },
    ],
  },
  style: {
    title: {
      value: 'Ad Performance',
      defaultValue: 'Backup Title',
    },
    significanceThreshold: {
      value: '0.05',
      defaultValue: '0.05',
    },
  },
}
