import { createServer, start } from './core'
import path from 'path'

const options = { logger: false }
const targetDir = path.join(__dirname)

createServer(options, targetDir).then(server => {
  start(server)
})
