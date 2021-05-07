module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-order'],
  rules: {
    'declaration-block-single-line-max-declarations': 3,
    'selector-pseudo-class-no-unknown': [true, {
      'ignorePseudoClasses': [
        '/^:/',
        'export',
        'global'
      ]
    }],
    'property-no-unknown': [true, {
      'ignoreProperties': ['c1']
    }],
    'order/properties-order': [
      'display',
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'float',
      'clear',
      'visibility',
      'overflow',
      'width',
      'height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'border',
      'background',
      'color',
      'font',
      'font-size',
      'line-height',
      'text-decoration',
      'text-align',
      'vertical-align',
      'white-space',
      'break-word',
      'border-radius',
      'box-shadow'
    ]

  }
}