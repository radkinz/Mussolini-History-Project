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
const { Console } = require('console')

//setup app
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.engine('html', engines.hogan)
app.set('views', __dirname + '/views')

//led pin location lists
let pinlocs = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3]

app.get('/', (req, res) => {
    //turn all leds off
    for (let i = 0; i < pinlocs.length; i++) {
      var pin = new Led(pinlocs[i])
      pin.off()
    }
  res.render('index.html', {})
})

app.post('/turnledon', (req, res) => {
  //turn other leds off
  for (let i = 0; i < pinlocs.length; i++) {
    var pin = new Led(pinlocs[i])
    pin.off()
  }

  //check if need to light both brit and france
  if (req.body.submit == "11&10") {
    var led1 = new Led(11)
    var led2 = new Led(10)
    led1.on()
    led2.on()
  } else {
    var led = new Led(parseInt(req.body.submit))
    led.on()
  }
  res.render('index.html', {})
})

app.listen(3000, () => {
  console.log('listening on *:3000')
})
