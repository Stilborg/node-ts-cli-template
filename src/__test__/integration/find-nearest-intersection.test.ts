/* eslint-disable @typescript-eslint/explicit-function-return-type */
import app from '../../app'
import request from 'supertest'

import * as fixtures from '../geolocation.fixture'

describe(`Hit the 'geo/find-nearest-intersection' endpoint`, () => {
  test('Returns expected values', async () => {
    const result = await request(app).get(
      `/geo/find-nearest-intersection?latitude=${fixtures.FishEagleRanch.latitude}&longitude=${fixtures.FishEagleRanch.longitude}`,
    )
    expect(result.status).toEqual(200)
    const resultdata = JSON.parse(result.text)
    expect(resultdata.intersectionName).toBe('Filbert St')
    expect(resultdata.angleToIntersection).toBe(173.4954440312665)
    expect(resultdata.cardinalDirectionToIntersection).toBe('S')
  })
})

describe(`Hit the 'geo/find-nearest-intersection' endpoint with junk query params`, () => {
  test('We get a 404', async () => {
    const result = await request(app).get(
      `/geo/find-nearest-intersection?latitude=SkumHest&longitude=${fixtures.FishEagleRanch.longitude}`,
    )
    expect(result.status).toEqual(404)
  })
})
