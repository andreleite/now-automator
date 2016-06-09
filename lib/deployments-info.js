import { cmdExtract } from './cmd'

export function parseDeployments (projectName, data) {
  let output = []
  let isProject = false
  data.split('\n').filter(v => v !== '').every((item) => {
    if (item.indexOf(' ') === -1) {
      if (item === projectName) {
        isProject = true
      } else {
        if (isProject === true) {
          return false
        }
      }
    } else {
      if (isProject === true) {
        item = item.split(' ').filter(v => v !== '').splice(0, 3)
        output.push(item)
      }
    }
    return true
  })
  return output
}

export async function getDeployments (projectName) {
  return new Promise(async (resolve) => {
    let response = await cmdExtract('now', ['ls'])
    resolve(parseDeployments(projectName, response))
  })
}
