import getProjectName from './package-info'
import { getAliases } from './aliases-info'
import { getDeployments } from './deployments-info'
import { applyAlias } from './alias-apply'

export async function run () {
  let projectName = getProjectName()
  let aliases = await getAliases()
  let deployments = await getDeployments(projectName)
  applyAlias(projectName, aliases, deployments)
}
