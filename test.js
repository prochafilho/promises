const test = require('ava')

const { login }= require('./asyncPromise')

test('retry every second until user is logged in',async t => {
  const user = await login()

  t.true(user)
})
