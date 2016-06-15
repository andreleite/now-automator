import { spawn } from 'child_process'

export function cmdExtract (bin, params) {
  const cmd = spawn(bin, params)
  return new Promise((resolve, reject) => {
    let output = ''

    cmd.stdout.on('data', (data) => {
      output += data.toString()
    })

    cmd.on('error', (err) => {
      resolve(err)
    })

    cmd.on('close', () => {
      resolve(output)
    })
  })
}

export function cmdConsole (bin, params = []) {
  spawn(bin, params, { shell: true, stdio: 'inherit' })
}
