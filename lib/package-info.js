import fs from 'fs'

export default function getProjectName () {
  if (!fs.existsSync(`${process.cwd()}/package.json`)) {
    return 'ns'
  }
  return JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`, 'utf8')).name
}
