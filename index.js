var EE = require('events').EventEmitter

var through = require('through'),
    chronotrigger = require('chronotrigger'),
    remorse = require('remorse'),
    demorse = require('morse-decode-stream')

var output_element = document.getElementById('output'),
    touch_pad = document.getElementById('input')

var output = through(write_output),
    input = new EE()

touch_pad.addEventListener('touchstart', trigger_start)
touch_pad.addEventListener('touchend', trigger_end)

function write_output(data) {
  output_element.innerHTML = output_element.innerHTML + data
}

chronotrigger(input, 'touchstart', 'touchend', 1050)
  .pipe(remorse(150, 75))
  .pipe(demorse(150))
  .pipe(output)

function trigger_start(ev) {
  ev.preventDefault()
  input.emit('touchstart')
}

function trigger_end(ev) {
  ev.preventDefault()
  input.emit('touchend')
}
