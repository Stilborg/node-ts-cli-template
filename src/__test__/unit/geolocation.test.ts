/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jest from 'jest'

import * as fixtures from '../geolocation.fixture'
import { mockedIntersectionDataSet } from '../../geolocation/geolocationData'

import { IIntersection } from '../../geolocation/geolocationTypes'
import { calculateNearestIntersectionUsingTurf, calculateBearingUsingTurf } from '../../geolocation/turfSpecialisations'
import { calculateBearing, bearingToCardinalDirection } from '../../geolocation/goelocationFunctions'

describe('Is the dataset valid', () => {
  test('Do we have the right numbers of Intersections?', async () => {
    const dataSet = await mockedIntersectionDataSet()
    expect(dataSet.length).toBe(56)
  })
})

describe('625 Holly Park Cir, San Francisco', () => {
  let result: IIntersection | null
  let bearing: number
  test('Closest intersection', async () => {
    const dataSet = await mockedIntersectionDataSet()
    result = await calculateNearestIntersectionUsingTurf(fixtures.HollyPark, dataSet)
    expect(result).not.toBe(null)
    expect(result!.Street).toBe('Mission St')
  })
  test('Bearing to Mission St?', async () => {
    bearing = await calculateBearing({
      fromPoint: fixtures.HollyPark,
      toPoint: { latitude: result!.Lat, longitude: result!.Long },
      bearingCalculator: calculateBearingUsingTurf,
    })
    expect(bearing).toBe(355.9742386216652)
  })
  test('Cardinal Direction to Mission Street?', async () => {
    const dir = bearingToCardinalDirection(bearing)
    expect(dir).toBe('N')
  })
})

describe(`Uncle David's ranch`, () => {
  let result: IIntersection | null
  let bearing: number

  test('Closest intersection?', async () => {
    const dataSet = await mockedIntersectionDataSet()
    result = await calculateNearestIntersectionUsingTurf(fixtures.FishEagleRanch, dataSet)
    expect(result).not.toBe(null)
    expect(result!.Street).toBe('Filbert St')
  })
  test('Bearing to Filbert St?', async () => {
    bearing = await calculateBearing({
      fromPoint: fixtures.FishEagleRanch,
      toPoint: { latitude: result!.Lat, longitude: result!.Long },
      bearingCalculator: calculateBearingUsingTurf,
    })
    expect(bearing).toBe(173.4954440312665)
  })
  test('Cardinal Direction to Filbert St?', async () => {
    const dir = bearingToCardinalDirection(bearing)
    expect(dir).toBe('S')
  })
})

describe(`Find the nearest intersection from Krimsvej`, () => {
  test('Is it Stockton St?', async () => {
    const dataSet = await mockedIntersectionDataSet()
    const result = await calculateNearestIntersectionUsingTurf(fixtures.Krimsvej, dataSet)
    expect(result).not.toBe(null)
    expect(result!.Street).toBe('Stockton St')
  })
})

// This is just to get 100% coverage, I'm such a dweeb
describe('All the corners of the world', () => {
  expect(bearingToCardinalDirection(0)).toBe('N')
  expect(bearingToCardinalDirection(45)).toBe('NE')
  expect(bearingToCardinalDirection(90)).toBe('E')
  expect(bearingToCardinalDirection(135)).toBe('SE')
  expect(bearingToCardinalDirection(180)).toBe('S')
  expect(bearingToCardinalDirection(225)).toBe('SW')
  expect(bearingToCardinalDirection(280)).toBe('W')
  expect(bearingToCardinalDirection(325)).toBe('NW')
  expect(bearingToCardinalDirection(360)).toBe('N')
})
