import { Response } from 'express'

/**
 * Representation of a map point
 */
export interface IPoint {
  latitude: number
  longitude: number
}

/** The specification of an Intersection */
export interface IIntersection {
  AddressNumber: number
  Street: string
  XCoord: number
  YCoord: number
  Lat: number
  Long: number
}

/** Locals root is for internal transport between middleware, locals.data is for output */
export interface INearestIntersectionResponse extends Response {
  locals: {
    targetPoint?: IPoint
    intersection?: IIntersection
    data: {
      intersectionName?: string
      angleToIntersection?: number
      cardinalDirectionToIntersection?: TCardinalDirection
    }
  }
}

export type TCardinalDirection = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'

/**
 *Interface for the footprint of the generic bearing calculation function
 * @export
 * @interface IBearingCalculationConfig
 */
export interface IBearingCalculationConfig {
  fromPoint: IPoint
  toPoint: IPoint
  bearingCalculator: Function
}

/**
 * Type for functions that returns a IntersectionDataSet
 * I actually prefer the interface way of defining function footprints that I am using below , but this works fine as well
 * */
export type TIntersectionDataProvider = () => Promise<IIntersection[]>

/**
 * Interface for functions that calculate nearest intersection from a point
 * */
export interface INearestPointCalculator {
  (point: IPoint, dataSet: IIntersection[]): Promise<IIntersection | null>
}

/**
 * Interface for functions that calculate bearings
 *
 * @export
 * @interface IBearingCalculation
 */
export interface IBearingCalculation {
  (fromPoint: IPoint, toPoint: IPoint): Promise<number>
}
