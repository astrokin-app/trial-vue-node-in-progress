import express from 'express'
import { routes } from './routes';

const app = express()

const PORT = process.env.PORT || 4000

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default {}