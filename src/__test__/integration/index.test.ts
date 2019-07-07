/* eslint-disable @typescript-eslint/explicit-function-return-type */
import app from '../../app'
import request from 'supertest'

/**
 * Scaffolding test, could be removed when it has served it purpose
 */
describe('Hello World test', () => {
  it('returns Hello World', async () => {
    const result = await request(app).get('/')
    expect(result.text).toEqual('Hello World.')
    expect(result.status).toEqual(200)
  })
})
