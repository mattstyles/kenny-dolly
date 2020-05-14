
/**
 * This works great, a new subscription gets the last event immediately
 * dispatched through the subscription (without the other subscribers also
 * receiving the event again).
 * There is one subtlety which is that a held stream will only emit _if_ it
 * already has a previous subscriber. This is fine for the `raid` use-case.
 * see https://github.com/mostjs/hold/pull/37#issuecomment-517272555
 */

const { fromEvent } = require('most-from-event')
const { runEffects, tap } = require('@most/core')
const { newDefaultScheduler } = require('@most/scheduler')
const { hold } = require('@most/hold')

const { ee } = require('./event')
const { log, delay } = require('./utils')

console.warn('\nMake sure you have the correct version of hold, v2 for mostv1 and v3 for most/core\n')

const scheduler = newDefaultScheduler()

const stream = fromEvent('action', ee)
const held = hold(stream)
// stream.observe(log('  1:'))

console.log('attaching 1.')
// runEffects(tap(log('  1:'), stream), newDefaultScheduler())
held.run({
  event: (time, event) => log('  1:')(event)
}, scheduler)

console.log('emitting')
ee.emit('action', 'hello')

delay(() => {
  console.log('attaching 2.')
  // runEffects(tap(log('  2:'), stream), newDefaultScheduler())
  held.run({
    event: (time, event) => log('  2:')(event)
  }, scheduler)

  delay(() => {
    console.log('emitting')
    ee.emit('action', 'world')
  })
})
