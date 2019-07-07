import {
  TIntersectionDataProvider,
  IIntersection,
  IPoint,
  INearestPointCalculator,
  IBearingCalculationConfig,
  TCardinalDirection,
} from './geolocationTypes'

/**
 * calculateNearestIntersectionFromDataSet
 * Load the dataset and call the the calculator to return the nearest Intersection
 * point, DataSource and calculation functions are passed as params *
 * @export
 * @param {IPoint} point
 * @param {TIntersectionDataProvider} Injected getDataSet Function of type that will provide a dataset
 * @param {INearestPointCalculator} Injected calculateNearestIntersection Function with interface that will perform the calculation
 * @returns {(Promise<IIntersection | null>)}
 */
export async function calculateNearestIntersectionFromDataSet(
  point: IPoint,
  getDataSet: TIntersectionDataProvider,
  calculateNearestIntersection: INearestPointCalculator,
): Promise<IIntersection | null> {
  const dataSet = await getDataSet()
  return await calculateNearestIntersection(point, dataSet)
}

/**
 * Abstraction for bearing calculation
 * Takes a specialised calculator and returns the specialised calculation rsult
 * @export
 * @param {IBearingCalculationConfig} config
 * @returns {Promise<number>}
 */
export async function calculateBearing(config: IBearingCalculationConfig): Promise<number> {
  return await config.bearingCalculator(config.fromPoint, config.toPoint)
}
/**
 * bearingToCardinalDirection
 * @export
 * @param {number} bearing
 * @returns {TCardinalDirection}
 */
export function bearingToCardinalDirection(bearing: number): TCardinalDirection {
  var val = Math.floor(bearing / 45 + 0.5)
  var arr = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return arr[val % 8] as TCardinalDirection
}
