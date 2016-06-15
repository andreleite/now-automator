import colors from 'colors/safe'
import { cmdConsole } from './cmd'

export function getDomainToApply (projectName, aliases) {
  let search = projectName.substr(0, 100).toLowerCase().replace(/[^a-z0-9\-]/g, '')
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

export function autoApplyAlias (projectName, aliases, deployments) {
  let domainToApply = getDomainToApply(projectName, aliases)
  if (domainToApply === null) {
    console.log(`> ${colors.red('Error!')} Alias not found for this project`)
    return
  }
  cmdConsole(
    'now',
    ['alias', 'set', deployments[0][1], getDomainToApply(projectName, aliases)]
  )
}
