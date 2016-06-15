import { cmdConsole } from './cmd'

export function removeOldDeployments (projectName, deployments) {
  let shell = []
  deployments.shift()
  deployments.forEach((item) => {
    shell.push(`echo Y | now rm ${item[0]}`)
  })
  cmdConsole(shell.join(' && '))
}
