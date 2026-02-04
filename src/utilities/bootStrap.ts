/* eslint-disable no-console */
import mongoose from 'mongoose'
import config from '../config'
import app from '../app'
import { Server } from 'http'
import { errorlogger, logger } from '../shared/logger'
let server: Server

export async function bootStrap() {
  try {
    await mongoose.connect(config.db_uri as string)
    server = app.listen(config.port, (): void => {
      logger.info(
        `==== ✌️  Your server is running on http://localhost:${config.port} ====`,
      )
    })
    logger.info(`==== ✌️  DB Connection is succesfully ====`)
  } catch (error) {
    errorlogger.error(`==== 🤞  Database Connection Error ====`, error)
  }

  process.on('unhandledRejection', error => {
    console.log(error)
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
