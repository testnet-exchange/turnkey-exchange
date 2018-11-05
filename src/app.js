import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
import blockchain from './services/blockchain'
import socketIO from "socket.io";

const app = express(apiRoot, api)
const server = http.createServer(app)


mongoose.connect(mongo.uri, { useNewUrlParser: true })
mongoose.Promise = Promise
const io = socketIO(server);
require("./services/Xchange/ws-run-method").xchangeWs(io);

setImmediate(() => {
  blockchain.init()
  blockchain.syncRunner()

  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
