
import { checkCurrentNodeVersion } from './utils'
import CookieCli from './cli'

const packageJson = require('../package.json')

const wantedNodeVersion = packageJson.engines.node

checkCurrentNodeVersion(wantedNodeVersion)

const cookieCli = new CookieCli()
cookieCli.run()

