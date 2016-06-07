import { spawn } from 'child_process'
import fs from 'fs'

const cmd = (bin, params, cb) => {
  const process = spawn(bin, params)
  let output = ''
  let error = ''

  process.stdout.on('data', (data) => {
    output += data.toString()
  });

  process.stderr.on('data', (data) => {
    error += data.toString()
  });

  process.on('close', () => {
    cb(error || null, output)
  })
}

const getProjectName = () => {
  if (!fs.existsSync(`${process.cwd()}/package.json`)) {
    return 'ns'
  }
  return JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`, 'utf8')).name
}

const parseAliases = (data) => {
  let output = []
  data.split("\n").filter(v => v != '').forEach((item) => {
    item = item.split(' ').filter(v => v != '').splice(0,4)
    output.push(item)
  })
  return output
}

const getAliases = (cb) => {
  cmd('now', ['alias', 'ls'], (err, data) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    console.log(parseAliases(data))
  })
}

const parseDeployments = (data) => {
  const projectName = getProjectName()
  let output = []
  let isProject = false
  data.split("\n").filter(v => v != '').every((item) => {
    if (item.indexOf(' ') === -1) {
      if (item === projectName) {
        isProject = true
      } else if (isProject === true) {
        return false
      }
    } else if (isProject === true) {
      item = item.split(' ').filter(v => v != '').splice(0,3)
      output.push(item)
    }
    return true
  })
  return output
}

const getDeployments = (cb) => {
  cmd('now', ['ls'], (err, data) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    console.log(parseDeployments(data))
  })
}

export function run() {
  getProjectName()
  getAliases()
  getDeployments()
}
