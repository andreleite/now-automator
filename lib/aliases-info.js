import { cmdExtract } from './cmd'

function parseAliases (data) {
  let output = []
  data.split('\n').filter(v => v !== '').forEach((item) => {
    item = item.split(' ').filter(v => v !== '').splice(0, 4)
    output.push(item)
  })
  return output
}

export async function getAliases () {
  return new Promise(async (resolve) => {
    let response = await cmdExtract('now', ['alias', 'ls'])
    resolve(parseAliases(response))
  })
}
