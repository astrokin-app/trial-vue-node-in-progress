import express from 'express'
import { routes } from '../src/routes';
import cors from 'cors';
require("dotenv").config({ path: '../../.env' })

const app = express()

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const PORT = process.env.PORT || 3009

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use('/', cors(corsOptions), routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default {}