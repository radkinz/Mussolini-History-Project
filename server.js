const { Board, Led } = require('johnny-five')
const board = new Board({
  port: 'COM4' // Check if is your Arduino on this port
})

//set up express app
const express = require('express')
const app = express()

//install dependenciesnpm inst
const http = require('http').Server(app)
const bodyParser = require('body-parser')
const engines = require('consolidate')

//setup app
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.engine('html', engines.hogan)
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
  res.render('index.html', {})
})

app.post('/turnledon', (req, res) => {
  var led = new Led(parseInt(req.body.submit))
  led.on()
  res.render('index.html', {})
})

app.listen(3000, () => {
  console.log('listening on *:3000')
})
