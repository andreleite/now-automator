import { spawn } from 'child_process'

export function cmdExtract (bin, params) {
  const cmd = spawn(bin, params)
  return new Promise((resolve, reject) => {
    let output = ''
    let error = ''

    cmd.stdout.on('data', (data) => {
      output += data.toString()
    })

    cmd.stderr.on('data', (data) => {
      error += data.toString()
    })

    cmd.on('close', () => {
      if (error) {
        reject(error)
        return
      }
      resolve(output)
    })
  })
}

export function cmdConsole (bin, params) {
  spawn(bin, params, { shell: true, stdio: 'inherit' })
}
