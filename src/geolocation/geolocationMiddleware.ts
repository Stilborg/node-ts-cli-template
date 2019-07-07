import { Request, NextFunction } from 'express'
import { IGenericRequestInterface } from '../expressApp'
import { INearestIntersectionResponse, IPoint } from './geolocationTypes'
import {
  calculateNearestIntersectionFromDataSet,
  calculateBearing,
  bearingToCardinalDirection,
} from './goelocationFunctions'
import { mockedIntersectionDataSet } from './geolocationData'
import { calculateNearestIntersectionUsingTurf, calculateBearingUsingTurf } from './turfSpecialisations'

/**
 * findNearestIntersection
 * Attach the TargetPoint to locals for transport
 * Find the nearest interface and attach it to locals for transport
 * Attach the Street name to locals.data for output
 * @export
 * @param {IGenericRequestInterface<IPoint>} req
 * @param {INearestIntersectionResponse} res
 * @param {NextFunction} next
 * @returns
 */
export async function findNearestIntersection(
  req: IGenericRequestInterface<IPoint>, // The Ipoint interface is attached to and now defines the query parameter of the Request object
  res: INearestIntersectionResponse,
  next: NextFunction,
): Promise<void> {
  // Convert input data to IPoint and attach to locals
  res.locals.targetPoint = req.query

  /**
   *  This is where is it possible to inject another TIntersectionDataProvider function or a another INearestPointCalculator function
   */
  const nearestIntersection = await calculateNearestIntersectionFromDataSet(
    res.locals.targetPoint,
    mockedIntersectionDataSet,
    calculateNearestIntersectionUsingTurf,
  )
  if (!nearestIntersection) {
    return res.status(404).end() // Return 404 if no intersection was found
  }
  res.locals.intersection = nearestIntersection!
  res.locals.data = { intersectionName: nearestIntersection!.Street }
  next()
}
/**
 * findAngleToIntersection
 * Find the angle and attach it to  locals.data for output
 * @export
 * @param {Request} req
 * @param {INearestIntersectionResponse} res
 * @param {NextFunction} next
 */
export async function findAngleToIntersection(
  req: Request,
  res: INearestIntersectionResponse,
  next: NextFunction,
): Promise<void> {
  const toPoint: IPoint = { latitude: res.locals.intersection!.Lat, longitude: res.locals.intersection!.Long }
  // This is where an alternative to turfs bearing calculation can be injected
  const bearing = await calculateBearing({
    fromPoint: res.locals.targetPoint!,
    toPoint,
    bearingCalculator: calculateBearingUsingTurf,
  })
  res.locals.data.angleToIntersection = bearing
  next()
}
/**
 * findCardinalDirectionToIntersection
 * Find the direction and attach it to locals.data for output
 * @export
 * @param {Request} req
 * @param {INearestIntersectionResponse} res
 * @param {NextFunction} next
 */
export async function findCardinalDirectionToIntersection(
  req: Request,
  res: INearestIntersectionResponse,
  next: NextFunction,
): Promise<void> {
  res.locals.data.cardinalDirectionToIntersection = bearingToCardinalDirection(res.locals.data.angleToIntersection!)
  next()
}
/**
 * returnInfoForNearestIntersection
 * Output locals.data as json
 * @export
 * @param {Request} req
 * @param {INearestIntersectionResponse} res
 */
export async function returnInfoForNearestIntersection(req: Request, res: INearestIntersectionResponse): Promise<void> {
  res.status(200).json(res.locals.data)
}
