import * as turf from '@turf/turf'
import { INearestPointCalculator, IPoint, IIntersection, IBearingCalculation } from './geolocationTypes'

/**
 * So the fine people at turf decided to go with long before lat when defining a point? Ok ...
 *
 * @param {IPoint} input
 * @returns The Azimuth (0 - 360 degress bearing)
 */
function turfPointFromIPoint(input: IPoint): turf.helpers.Coord {
  return turf.point([input.longitude, input.latitude])
}

/**
 * calculateNearestIntersectionUsingTurf
 * Turf specific specialisation of the INearestPointCalculator interface, using the turf.js package to calculate nearest Intersection
 * @export
 * @param {IPoint} point
 * @param {IIntersection[]} dataSet
 * @interface INearestPointCalculator
 * @returns {(Promise<IIntersection | null>)}
 */
export let calculateNearestIntersectionUsingTurf: INearestPointCalculator = async function(
  startingPoint: IPoint,
  dataSet: IIntersection[],
): Promise<IIntersection | null> {
  try {
    const target = turfPointFromIPoint(startingPoint)
    const points = dataSet.map(
      (inter): turf.helpers.Feature => {
        return turf.point([inter.Long, inter.Lat])
      },
    )
    const coll = turf.featureCollection(points)
    const nearest = turf.nearestPoint(target, coll)

    return dataSet[nearest.properties.featureIndex]
  } catch (e) {
    console.log(`Something happended in turf land: ${e}`)

    return null
  }
}

/**
 * Turf specific implementation of the IBearingCalculation interface
 * */
export let calculateBearingUsingTurf: IBearingCalculation = async function(
  fromPoint: IPoint,
  toPoint: IPoint,
): Promise<number> {
  const start = turfPointFromIPoint(fromPoint)
  const end = turfPointFromIPoint(toPoint)
  return turf.bearingToAzimuth(turf.bearing(start, end))
}
