// The app module is seperated from the index file, so that it can be used for endpoint testing by supertest
import express from 'express'
import * as bodyParser from 'body-parser'
import { geolocationRoutes } from './geolocation/geolocationRoutes'

const app: express.Application = express()

app.use(bodyParser.json())

/**
 * Basic hello world route, for testing purposes
 */
app.get('/', (req, res): void => {
  res.status(200)
  res.send('Hello World.')
  res.end()
})

/**
 *  Importing geolocation routes from the geolocation structure
 */
app.use('/', geolocationRoutes)
/**
 * Import additional routes here
 * */

export default app
