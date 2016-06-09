import { cmdConsole } from './cmd'

export function getDomainToApply (projectName, aliases) {
  let search = projectName.replace(/\./g, '')
  let output = null
  aliases.every((item) => {
    if (item[1].indexOf(search) !== -1) {
      output = item[2]
      return false
    }
    return true
  })
  return output
}

export function applyAlias (projectName, aliases, deployments) {
  cmdConsole(
    'now',
    ['alias', 'set', deployments[0][1], getDomainToApply(projectName, aliases)]
  )
}
