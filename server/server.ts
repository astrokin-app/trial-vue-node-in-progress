import express from 'express'
import { routes } from './routes';
import cors from 'cors';
require("dotenv").config()

const app = express()

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const PORT = process.env.PORT || 4000

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use('/', cors(corsOptions), routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default {}