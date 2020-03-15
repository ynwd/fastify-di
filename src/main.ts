import { createServer, start } from './core'

createServer().then(server => {
  start(server)
})
