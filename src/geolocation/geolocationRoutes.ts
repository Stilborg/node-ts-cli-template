import { Router } from 'express'
import {
  findNearestIntersection,
  findCardinalDirectionToIntersection,
  findAngleToIntersection,
  returnInfoForNearestIntersection,
} from './geolocationMiddleware'

export const geolocationRoutes = Router()

/**
 * Validate the input, find nearest intersection, calculate the angle, calc the cardinal dir and return the result
 */
geolocationRoutes.get(
  '/geo/find-nearest-intersection',
  findNearestIntersection,
  findAngleToIntersection,
  findCardinalDirectionToIntersection,
  returnInfoForNearestIntersection,
)
