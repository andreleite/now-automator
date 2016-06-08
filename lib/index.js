import { spawn } from 'child_process'
import fs from 'fs'

const projectName = (() => {
  if (!fs.existsSync(`${process.cwd()}/package.json`)) {
    return 'ns'
  }
  return JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`, 'utf8')).name
})()

const cmdExtract = (bin, params) => {
  const cmd = spawn(bin, params)
  return new Promise((resolve, reject) => {
    let output = ''
    let error = ''

    cmd.stdout.on('data', (data) => {
      output += data.toString()
    });

    cmd.stderr.on('data', (data) => {
      error += data.toString()
    });

   cmd.on('close', () => {
      if (error) {
        reject(error)
        return
      }
      resolve(output)
    })
  })
}

const cmdConsole = (bin, params) => {
  const cmd = spawn(bin, params)
  cmd.stdout.on('data', (data) => {
    process.stdout.write(data.toString())
  });

  cmd.stderr.on('data', (data) => {
    process.stdout.write(data.toString())
  });
}

const parseAliases = (data) => {
  let output = []
  data.split("\n").filter(v => v != '').forEach((item) => {
    item = item.split(' ').filter(v => v != '').splice(0,4)
    output.push(item)
  })
  return output
}

const getAliases = async (cb) => {
  let response = await cmdExtract('now', ['alias', 'ls'])
  return parseAliases(response)
}

const parseDeployments = (data) => {
  let output = []
  let isProject = false
  data.split("\n").filter(v => v != '').every((item) => {
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
        item = item.split(' ').filter(v => v != '').splice(0,3)
        output.push(item)
      }
    }
    return true
  })
  return output
}

const getDeployments = async (cb) => {
  let response = await cmdExtract('now', ['ls'])
  return parseDeployments(response)
}

const getDomainToApply = (aliases) => {
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

const applyAlias = (aliases, deployments) => {
  var response = cmdConsole(
    'now',
    ['alias', 'set', deployments[0][1], getDomainToApply(aliases)]
  )
}

export async function run() {
  console.log('> Applying alias automatically...')
  let [
    aliases,
    deployments
  ] = await Promise.all([
    getAliases(),
    getDeployments()
  ])
  applyAlias(aliases, deployments)
}
