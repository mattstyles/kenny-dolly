
exports.log = pre => {
  if (typeof pre === 'undefined') {
    console.log()
    return
  }

  return _ => console.log(pre, _)
}

exports.delay = fn => {
  console.log('waiting...')
  setTimeout(() => {
    console.log('')
    fn()
  }, 500)
}
