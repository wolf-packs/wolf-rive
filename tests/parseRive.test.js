/* global test, expect */
const { parseRive } = require('../src')

test('simple Rive script parse', () => {
  const actual = parseRive('./tests/simple.rive')
  // const expected = {
  //   begin: {
  //     global: {},
  //     var: {},
  //     sub: {},
  //     person: {},
  //     array: {},
  //     triggers: []
  //   },
  //   topics: {
  //     simple: [
  //       {
  //         trigger: 'hi bot',
  //         reply: [ 'hello human' ],
  //         condition: [],
  //         redirect: null,
  //         previous: null
  //       }
  //     ]
  //   },
  //   inherits: {
  //     simple: {}
  //   },
  //   includes: {
  //     simple: {}
  //   },
  //   objects: {
  //     javascript: {
  //       _objects: {}
  //     }
  //   }
  // }
  expect(actual).toHaveProperty(['topics', 'simple'])
  expect(actual.topics.simple).toHaveLength(1)
})
