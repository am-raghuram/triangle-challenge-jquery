const express = require('express')
const app = express()

app.get('/test', (req, res) => res.send('Express up and running !'))

app.use(express.static('static'))

app.listen(3000, () => console.log('App listening on port 3000!'))