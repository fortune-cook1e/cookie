import {
  ESLINT_PLUGIN_TYPE,
  STYLELINT_PLIGIN_TYPE,
  TSCONFIG_PLUGIN,
  ESLINT_BASIC,
  ESLINT_TYPESCRIPT,
  ESLINT_REACT,
  ESLINT_TS_REACT,
  ESLINT_VUE,
  STYLELINT_BASIC,
  TSCONFIG_BASIC
} from '../constants'

export const pluginTypeQuestions = [
  {
    type: 'list',
    name: 'pluginType',
    message: 'What kind of plugin do you wanna create?',
    choices: [ESLINT_PLUGIN_TYPE, STYLELINT_PLIGIN_TYPE, TSCONFIG_PLUGIN]
  }
]

export const eslintTemplateQuestions = [
  {
    type: 'list',
    name: 'pluginTemplate',
    message: 'What kind of eslint template do you wanna create?',
    choices: [
      ESLINT_BASIC,
      ESLINT_TYPESCRIPT,
      ESLINT_REACT,
      ESLINT_TS_REACT,
      ESLINT_VUE
    ]
  }
]

export const stylelintTemplateQuestions = [
  {
    type: 'list',
    name: 'pluginTemplate',
    message: 'What kind of stylelint template do you wanna create?',
    choices: [
      STYLELINT_BASIC,
    ]
  }
]

export const tsconfigTemplateQuestions = [
  {
    type: 'list',
    name: 'pluginTemplate',
    message: 'What kind of tsconfig.json template do you wanna create?',
    choices: [
      TSCONFIG_BASIC,
    ]
  }
]