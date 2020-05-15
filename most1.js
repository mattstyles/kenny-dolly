
/**
 * This works great, a new subscription gets the last event immediately
 * dispatched through the subscription (without the other subscribers also
 * receiving the event again).
 * There is one subtlety which is that a held stream will only emit _if_ it
 * already has a previous subscriber. This is fine for the `raid` use-case.
 * see https://github.com/mostjs/hold/pull/37#issuecomment-517272555
 */

const most = require('most')
// This is an npm alias to make sure we get the correct @most/hold version
// for most@1 used here
const { hold } = require('@most/hold2')

const { ee } = require('./event')
const { log, delay } = require('./utils')

console.warn('\nMake sure you have the correct version of hold, v2 for mostv1 and v3 for most/core\n')

console.log('Attaching immediately')
var stream = most.fromEvent('action', ee)
var held = hold(stream)

const subscription = held.subscribe({
  next: log('  1. Observing on creation::  ')
})
// Detaching immediately from a held stream is fine, hold will still
// fire out messages to new observers (it won't if you never observe)
subscription.unsubscribe()

// Emitting here is async so it'll fire on the next tick, after the message
// from the delay function.
console.log('Fire in the hole:')
ee.emit('action', 'hello')

delay(() => {
  // This is a 'standard' stream subscription, which will emit on the _next_
  // event. We want to see if we can get an immediate firing (which is where
  // @most/hold comes in)
  console.log('Attaching later')
  stream.observe(log('  2. Observing later::  '))

  // In theory, if the docs are to be believed, this observer will emit
  // when attached to the stream
  console.log('Attaching to the eye of the beholder')
  held.observe(log('  3. I am beholden to no-one (I lie)::  '))

  delay(() => {
    console.log('firing:')
    ee.emit('action', 'hello')
  })
})
