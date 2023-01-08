import express from 'express'
import { routes } from './routes';
const app = express()

const PORT = process.env.PORT || 4000

// routes
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default {}