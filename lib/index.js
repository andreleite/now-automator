import minimist from 'minimist'
import getProjectName from './package-info'
import { getAliases } from './aliases-info'
import { getDeployments } from './deployments-info'
import { autoApplyAlias } from './auto-apply-alias'
import { removeOldDeployments } from './remove-old-deployments'

let param = minimist(process.argv.slice(1))._[1]

export async function run () {
  let projectName
  let aliases
  let deployments
  switch (param) {
    case 'auto-apply-alias':
      projectName = getProjectName()
      aliases = await getAliases()
      deployments = await getDeployments(projectName)
      autoApplyAlias(projectName, aliases, deployments)
      break
    case 'remove-old-deployments':
      projectName = getProjectName()
      deployments = await getDeployments(projectName)
      removeOldDeployments(projectName, deployments)
      break
    default:
      console.log(
        '\n',
        '  $ now-automator <command>',
        '\n',
        '\n',
        '  Commands:',
        '\n',
        '\n',
        '    auto-apply-alias             apply last alias of project in last deployment',
        '\n',
        '    remove-old-deployments       remove all old deploys',
        '\n',
        '    help                         this help',
        '\n'
      )
  }
}
