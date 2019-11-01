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
        dimensions: ['Campaign Name Here', '1234567890123'],
        headline: [''],
        headline1: ['This is the first headline'],
        headline2: ['This is the second headline'],
        displayUrl: ['https://example.com'],
        path1: ['--'],
        path2: ['--'],
        description: [
          'This is the description. Call today for more information!'
        ],
        description1: [''],
        description2: [''],
        metrics: [28, 258.5, 139397667]
      },
      {
        dimensions: ['Second Campaign', '2222567890123'],
        headline: [''],
        headline1: ['This is the first headline'],
        headline2: ['This is the second headline'],
        displayUrl: ['https://example.com'],
        path1: ['--'],
        path2: ['--'],
        description: [
          'This is the description. Call today for more information!'
        ],
        description1: [''],
        description2: [''],
        metrics: [15, 158.5, 229397667]
      }
    ]
  },
  fields: {
    dimensions: [
      {
        id: 'qt_efl53xx9xb',
        name: 'CampaignName',
        type: 'TEXT',
        concept: 'DIMENSION'
      },
      { id: 'qt_bmpjb2x9xb', name: 'Id', type: 'NUMBER', concept: 'DIMENSION' }
    ],
    metrics: [
      {
        id: 'qt_4s6clyx9xb',
        name: 'Conversions',
        type: 'NUMBER',
        concept: 'METRIC'
      },
      {
        id: 'qt_z4gzmyx9xb',
        name: 'ConversionRate',
        type: 'NUMBER',
        concept: 'METRIC'
      },
      {
        id: 'qt_knilpyx9xb',
        name: 'CostPerConversion',
        type: 'NUMBER',
        concept: 'METRIC'
      }
    ],
    headline: [
      {
        id: 'qt_940vwwuayb',
        name: 'Headline',
        type: 'TEXT',
        concept: 'DIMENSION'
      }
    ],
    headline1: [
      {
        id: 'qt_u358xwuayb',
        name: 'HeadlinePart1',
        type: 'TEXT',
        concept: 'DIMENSION'
      }
    ],
    headline2: [
      {
        id: 'qt_xkytzwuayb',
        name: 'HeadlinePart2',
        type: 'TEXT',
        concept: 'DIMENSION'
      }
    ],
    displayUrl: [
      {
        id: 'qt_c52p1wuayb',
        name: 'FinalUrl',
        type: 'URL',
        concept: 'DIMENSION'
      }
    ],
    path1: [
      { id: 'qt_je3c6wuayb', name: 'Path1', type: 'TEXT', concept: 'DIMENSION' }
    ],
    path2: [
      { id: 'qt_ksuvaxuayb', name: 'Path2', type: 'TEXT', concept: 'DIMENSION' }
    ],
    description: [
      {
        id: 'qt_xa0xcxuayb',
        name: 'Description',
        type: 'TEXT',
        concept: 'DIMENSION'
      }
    ],
    description1: [
      {
        id: 'qt_iaxzexuayb',
        name: 'Description1',
        type: 'TEXT',
        concept: 'DIMENSION'
      }
    ],
    description2: [
      {
        id: 'qt_fuksgxuayb',
        name: 'Description2',
        type: 'TEXT',
        concept: 'DIMENSION'
      }
    ]
  },
  style: {
    title: {
      defaultValue: 'Ad Performance'
    }
  },
  theme: {
    themeFillColor: { color: '#fff', opacity: 1 },
    themeFontColor: { color: '#616161', opacity: 1 },
    themeFontFamily: 'Roboto',
    themeAccentFillColor: { color: '#4285F4', opacity: 1 },
    themeAccentFontColor: { color: '#EFEFEF', opacity: 1 },
    themeAccentFontFamily: 'Roboto',
    themeSeriesColor: [
      { color: '#4285F4', opacity: 1 },
      { color: '#DB4437', opacity: 1 },
      { color: '#F4B400', opacity: 1 },
      { color: '#0F9D58', opacity: 1 },
      { color: '#AB47BC', opacity: 1 },
      { color: '#00ACC1', opacity: 1 },
      { color: '#FF7043', opacity: 1 },
      { color: '#9E9D24', opacity: 1 },
      { color: '#5C6BC0', opacity: 1 },
      { color: '#F06292', opacity: 1 },
      { color: '#00796b', opacity: 1 },
      { color: '#c2185b', opacity: 1 },
      { color: '#7e57c2', opacity: 1 },
      { color: '#03a9f4', opacity: 1 },
      { color: '#8bc34a', opacity: 1 },
      { color: '#fdd835', opacity: 1 },
      { color: '#fb8c00', opacity: 1 },
      { color: '#8d6e63', opacity: 1 },
      { color: '#9e9e9e', opacity: 1 },
      { color: '#607d8b', opacity: 1 }
    ],
    themeIncreaseColor: { color: '#388e3c', opacity: 1 },
    themeDecreaseColor: { color: '#f44336', opacity: 1 },
    themeGridColor: { color: '#e9e9e9', opacity: 1 }
  },
  interactions: {}
};
