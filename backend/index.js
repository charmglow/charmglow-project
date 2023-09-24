const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send("CHARM GLOW SERVER IS UP AND RUNNING"
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})