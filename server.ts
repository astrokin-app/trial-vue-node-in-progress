import Express from 'express'
const app = Express()

const PORT = process.env.PORT || 4000

app.get("/", (req, res) => {
  res.send("Hello Node-TS!")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default {}