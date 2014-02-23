var EE = require('events').EventEmitter

var through = require('through'),
    chronotrigger = require('chronotrigger'),
    remorse = require('remorse'),
    demorse = require('morse-decode-stream')

var output_element = document.getElementById('output'),
    touch_pad = document.getElementById('input')

var output = through(write_output),
    input = new EE()

var click_state = false

touch_pad.addEventListener('touchstart', trigger_start)
touch_pad.addEventListener('touchend', trigger_end)

touch_pad.addEventListener('click', trigger_touch)

function write_output(data) {
  output_element.innerHTML = output_element.innerHTML + data
}

chronotrigger(input, 'touchstart', 'touchend', 1750)
  .pipe(remorse(250, 100))
  .pipe(demorse(250))
  .pipe(output)

function trigger_touch() {
  input.emit(click_state ? 'touchend' : 'touchstart')
  console.dir(click_state ? 'touchend' : 'touchstart')
  click_state = !click_state
}

function trigger_start(ev) {
  ev.preventDefault()
  input.emit('touchstart')
}

function trigger_end(ev) {
  ev.preventDefault()
  input.emit('touchend')
}
